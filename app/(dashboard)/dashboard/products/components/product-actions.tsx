"use client"

import { Product } from "@prisma/client"
import { useState } from "react"
import { ProductDialog } from "./product-dialog"
import { deleteProduct } from "../actions"

interface ProductActionsProps {
  mode: "create" | "edit" | "delete"
  product?: Product
}

export function ProductActions({ mode, product }: ProductActionsProps) {
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    if (!product) return
    
    try {
      await deleteProduct(product.id)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  if (mode === "delete") {
    return (
      <button
        onClick={handleDelete}
        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
      >
        Удалить
      </button>
    )
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
      >
        {mode === "create" ? "Создать" : "Редактировать"}
      </button>

      <ProductDialog
        mode={mode}
        open={open}
        setOpen={setOpen}
        product={product}
      />
    </>
  )
} 