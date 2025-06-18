import { getUserSession } from "@/shared/lib/get-user-session"
import { UserRole } from "@prisma/client"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const user = await getUserSession()

  if (!user || user.role !== UserRole.ADMIN) {
    redirect('/')
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-4">Панель администратора</h1>
      <p className="text-gray-600 mb-8">
        Добро пожаловать в панель администратора. Здесь вы можете управлять товарами, просматривать статистику и выполнять другие административные задачи.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link 
          href="/dashboard/products"
          className="block p-6 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            Управление товарами
          </h5>
          <p className="font-normal text-gray-700">
            Создавайте, редактируйте и удаляйте товары в каталоге
          </p>
        </Link>
      </div>
    </div>
  )
}
