import { prisma } from "@/prisma/prisma-client"
import { ProductActions } from "./product-actions"

export async function ProductsTable() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      items: {
        orderBy: {
          size: 'asc'
        }
      },
      ingredients: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold">Список товаров</h2>
        <ProductActions mode="create" />
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Название</th>
              <th className="px-6 py-3">Категория</th>
              <th className="px-6 py-3">Изображение</th>
              <th className="px-6 py-3">Ингредиенты</th>
              <th className="px-6 py-3">Варианты</th>
              <th className="px-6 py-3">Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b bg-white">
                <td className="px-6 py-4">{product.id}</td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category.name}</td>
                <td className="px-6 py-4">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="h-10 w-10 object-cover"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    {product.ingredients.map((ingredient) => (
                      <span key={ingredient.id} className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 mr-1">
                        {ingredient.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    {product.items.map((item) => (
                      <div key={item.id} className="text-xs">
                        {product.category.name === "Шаурма" ? (
                          <>
                            Размер: {item.size}, {item.shaurmaType === 1 ? "обычный" : "сырный"} - {item.price}₽
                          </>
                        ) : (
                          <>{item.price}₽</>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <ProductActions mode="edit" product={product} />
                    <ProductActions mode="delete" product={product} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 