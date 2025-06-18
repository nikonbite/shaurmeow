import { prisma } from "@/prisma/prisma-client";
import { Container, ProfileForm } from "@/shared/components";
import { getUserSession } from "@/shared/lib/get-user-session";
import { redirect } from "next/navigation";
import { getUserOrders } from "@/app/actions";
import UserOrders from "@/shared/components/user-orders";

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    return redirect("/not-auth");
  }

  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  });

  if (!user) {
    return redirect("/not-auth");
  }

  const orders = await getUserOrders();

  return (
    <div>
      <ProfileForm data={user} />
      <Container className="my-10">
        <h2>Ваши заказы</h2>
        <UserOrders orders={orders} />
      </Container>
    </div>
  );
}
