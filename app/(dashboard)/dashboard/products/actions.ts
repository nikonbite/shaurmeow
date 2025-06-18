"use server"

import { prisma } from "@/prisma/prisma-client"
import { getUserSession } from "@/shared/lib/get-user-session"
import { UserRole } from "@prisma/client"
import { revalidatePath } from "next/cache"

interface ProductData {
  name: string
  imageUrl: string
  categoryId: number
  ingredients: number[] | string[]
  items: {
    id?: number
    price: number
    size?: number
    shaurmaType?: number
  }[]
}

async function checkAdminAccess() {
  const user = await getUserSession()
  
  if (!user || user.role !== UserRole.ADMIN) {
    throw new Error("Доступ запрещен")
  }
}

export async function createProduct(data: ProductData) {
  try {
    await checkAdminAccess()

    // Преобразуем ингредиенты в числа
    const ingredientIds = Array.isArray(data.ingredients) 
      ? data.ingredients.map(id => Number(id))
      : []

    // Создаем продукт с ингредиентами
    const product = await prisma.product.create({
      data: {
        name: data.name,
        imageUrl: data.imageUrl,
        categoryId: Number(data.categoryId),
        ingredients: ingredientIds.length > 0 ? {
          connect: ingredientIds.map(id => ({ id }))
        } : undefined
      },
      include: {
        ingredients: true
      }
    })

    // Создаем варианты товара
    await Promise.all(
      data.items.map(async (item) => {
        await prisma.productItem.create({
          data: {
            productId: product.id,
            price: Number(item.price),
            size: item.size ? Number(item.size) : null,
            shaurmaType: item.shaurmaType ? Number(item.shaurmaType) : null
          }
        })
      })
    )

    revalidatePath("/dashboard/products")
    return product
  } catch (error) {
    console.error("[CREATE_PRODUCT]", error)
    throw error
  }
}

export async function updateProduct(id: number, data: ProductData) {
  try {
    await checkAdminAccess()

    // Преобразуем ингредиенты в числа
    const ingredientIds = Array.isArray(data.ingredients) 
      ? data.ingredients.map(id => Number(id))
      : []

    // Обновляем основную информацию о продукте
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        imageUrl: data.imageUrl,
        categoryId: Number(data.categoryId),
        ingredients: {
          set: ingredientIds.map(id => ({ id }))
        }
      },
      include: {
        ingredients: true,
        items: true
      }
    })

    // Удаляем старые варианты товара
    await prisma.productItem.deleteMany({
      where: { productId: Number(id) }
    })

    // Создаем новые варианты товара
    await Promise.all(
      data.items.map(async (item) => {
        await prisma.productItem.create({
          data: {
            productId: product.id,
            price: Number(item.price),
            size: item.size ? Number(item.size) : null,
            shaurmaType: item.shaurmaType ? Number(item.shaurmaType) : null
          }
        })
      })
    )

    revalidatePath("/dashboard/products")
    return product
  } catch (error) {
    console.error("[UPDATE_PRODUCT]", error)
    throw error
  }
}

export async function deleteProduct(id: number) {
  try {
    await checkAdminAccess()

    // Сначала удаляем все связанные ProductItem
    await prisma.productItem.deleteMany({
      where: { productId: Number(id) }
    })

    // Затем удаляем сам продукт
    const product = await prisma.product.delete({
      where: { id: Number(id) },
      include: {
        ingredients: true
      }
    })

    revalidatePath("/dashboard/products")
    return product
  } catch (error) {
    console.error("[DELETE_PRODUCT]", error)
    throw error
  }
} 