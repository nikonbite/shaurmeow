import { prisma } from "@/prisma/prisma-client"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const categories = await prisma.category.findMany()
    return NextResponse.json(categories)
  } catch (error) {
    console.error("[GET_CATEGORIES]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 