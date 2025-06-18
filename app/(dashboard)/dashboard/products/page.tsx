import { ProductsTable } from "./components/products-table"
import { getUserSession } from "@/shared/lib/get-user-session"
import { redirect } from "next/navigation"
import { UserRole } from "@prisma/client"

export default async function ProductsPage() {
  const user = await getUserSession()

  if (!user || user.role !== UserRole.ADMIN) {
    redirect('/')
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Управление товарами</h1>
      <ProductsTable />
    </div>
  )
}
