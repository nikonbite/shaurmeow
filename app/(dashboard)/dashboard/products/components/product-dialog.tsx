"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Category, Ingredient, Product, ProductItem } from "@prisma/client"
import { Fragment, useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { createProduct, updateProduct } from "../actions"

interface ProductDialogProps {
  mode: "create" | "edit"
  open: boolean
  setOpen: (open: boolean) => void
  product?: Product & { 
    category: Category
    ingredients: Ingredient[]
    items: ProductItem[]
  }
}

interface FormValues {
  name: string
  imageUrl: string
  categoryId: number
  ingredients: number[]
  items: {
    id?: number
    price: number
    size?: number
    shaurmaType?: number
  }[]
}

const DEFAULT_SHAURMA_SIZES = [20, 30, 40]
const DEFAULT_SHAURMA_TYPES = [
  { id: 1, name: "Традиционное" },
  { id: 2, name: "Тонкое" }
]

export function ProductDialog({ mode, open, setOpen, product }: ProductDialogProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)
  const [customSize, setCustomSize] = useState<number | null>(null)

  const { register, handleSubmit, watch, control, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      name: product?.name || "",
      imageUrl: product?.imageUrl || "",
      categoryId: product?.categoryId || 1,
      ingredients: product?.ingredients?.map(i => i.id) || [],
      items: product?.items?.map(item => ({
        id: item.id,
        price: Number(item.price),
        size: item.size ? Number(item.size) : undefined,
        shaurmaType: item.shaurmaType ? Number(item.shaurmaType) : undefined
      })) || [{ price: 0 }]
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  })

  const selectedCategory = watch("categoryId")
  const isShaurma = Number(selectedCategory) === 1
  const items = watch("items")
  const selectedIngredients = watch("ingredients") || []

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, ingredientsRes] = await Promise.all([
          fetch("/api/categories").then(res => res.json()),
          fetch("/api/ingredients").then(res => res.json())
        ])
        
        setCategories(categoriesRes)
        setIngredients(ingredientsRes)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // При изменении категории обновляем варианты товара
  useEffect(() => {
    if (mode === "create") {
      if (isShaurma) {
        setValue("items", DEFAULT_SHAURMA_SIZES.map(size => ({
          price: 0,
          size,
          shaurmaType: 1
        })))
      } else if (fields.length === 0) {
        setValue("items", [{ price: 0 }])
      }
    }
  }, [isShaurma, setValue, mode, fields.length])

  const onSubmit = async (data: FormValues) => {
    try {
      if (mode === "create") {
        await createProduct(data)
      } else {
        await updateProduct(product!.id, data)
      }
      
      setOpen(false)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddCustomSize = () => {
    if (!customSize) return

    const existingSize = items.find(item => Number(item.size) === customSize)
    if (!existingSize) {
      append({
        price: 0,
        size: customSize,
        shaurmaType: 1
      })
      setCustomSize(null)
    }
  }

  const handleToggleAllIngredients = () => {
    const currentIngredients = getValues("ingredients") || []
    const allIngredientIds = ingredients.map(i => i.id)
    
    if (currentIngredients.length === allIngredientIds.length) {
      setValue("ingredients", [])
    } else {
      setValue("ingredients", allIngredientIds)
    }
  }

  if (loading) {
    return null
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                        Название
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", { required: true })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-900">
                        URL изображения
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("imageUrl", { required: true })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-900">
                        Категория
                      </label>
                      <select
                        {...register("categoryId", { 
                          required: true,
                          valueAsNumber: true 
                        })}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {isShaurma && (
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-sm font-medium text-gray-900">
                            Ингредиенты
                          </label>
                          <button
                            type="button"
                            onClick={handleToggleAllIngredients}
                            className="text-sm text-indigo-600 hover:text-indigo-500"
                          >
                            {selectedIngredients.length === ingredients.length ? "Снять все" : "Выбрать все"}
                          </button>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          {ingredients.map((ingredient) => (
                            <div key={ingredient.id} className="flex items-center">
                              <input
                                type="checkbox"
                                value={ingredient.id}
                                {...register("ingredients")}
                                defaultChecked={product?.ingredients?.some(i => i.id === ingredient.id)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label className="ml-2 text-sm text-gray-900">
                                {ingredient.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-900">
                          Варианты товара
                        </label>
                        {!isShaurma ? (
                          <button
                            type="button"
                            onClick={() => append({ price: 0 })}
                            className="rounded-md bg-indigo-600 px-2 py-1 text-sm text-white hover:bg-indigo-500"
                          >
                            Добавить вариант
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={customSize || ""}
                              onChange={(e) => setCustomSize(Number(e.target.value))}
                              placeholder="Размер"
                              className="w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <button
                              type="button"
                              onClick={handleAddCustomSize}
                              className="rounded-md bg-indigo-600 px-2 py-1 text-sm text-white hover:bg-indigo-500"
                            >
                              Добавить размер
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="mt-2 space-y-4">
                        {fields.map((field, index) => (
                          <div key={field.id} className="flex items-end gap-4 bg-gray-50 p-4 rounded-lg">
                            {isShaurma ? (
                              <>
                                <div className="flex-1">
                                  <label className="block text-sm font-medium text-gray-700">
                                    Размер (см)
                                  </label>
                                  <input
                                    type="number"
                                    {...register(`items.${index}.size` as const, {
                                      valueAsNumber: true,
                                      required: true,
                                      min: 1
                                    })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                <div className="flex-1">
                                  <label className="block text-sm font-medium text-gray-700">
                                    Тип теста
                                  </label>
                                  <select
                                    {...register(`items.${index}.shaurmaType` as const, {
                                      valueAsNumber: true,
                                      required: true
                                    })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  >
                                    {DEFAULT_SHAURMA_TYPES.map(type => (
                                      <option key={type.id} value={type.id}>
                                        {type.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </>
                            ) : null}
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Цена
                              </label>
                              <input
                                type="number"
                                {...register(`items.${index}.price` as const, {
                                  valueAsNumber: true,
                                  required: true,
                                  min: 0
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="rounded-md bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
                            >
                              Удалить
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {mode === "create" ? "Создать" : "Сохранить"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 