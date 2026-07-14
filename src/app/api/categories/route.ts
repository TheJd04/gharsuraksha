import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    if (categories.length === 0) {
      const defaultCategories = [
        "Electronics",
        "Furniture",
        "Appliances",
        "Jewelry",
        "Clothing",
        "Art & Collectibles",
        "Tools",
        "Other"
      ];

      await prisma.category.createMany({
        data: defaultCategories.map(name => ({
          name,
          description: `Standard category for ${name.toLowerCase()}`
        }))
      });

      categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
      });
    }

    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
