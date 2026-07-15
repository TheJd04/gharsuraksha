import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;

    // Get a category or create a default one
    const category = await prisma.category.upsert({
      where: { name: "Electronics" },
      update: {},
      create: {
        name: "Electronics",
        icon: "💻",
        description: "Electronic devices",
        isPreseeded: true
      }
    });

    const furnitureCategory = await prisma.category.upsert({
      where: { name: "Furniture" },
      update: {},
      create: {
        name: "Furniture",
        icon: "🛋️",
        description: "Home furniture",
        isPreseeded: true
      }
    });

    // Create Sample Items
    await prisma.item.create({
      data: {
        userId,
        categoryId: category.id,
        name: "MacBook Pro 16\"",
        brand: "Apple",
        model: "M2 Max",
        estimatedValue: 250000,
        room: "Home Office",
        condition: "good",
        coverageStatus: "covered",
      }
    });

    await prisma.item.create({
      data: {
        userId,
        categoryId: category.id,
        name: "Sony OLED TV",
        brand: "Sony",
        model: "A80J 65\"",
        estimatedValue: 120000,
        room: "Living Room",
        condition: "new",
        coverageStatus: "uncovered",
      }
    });

    await prisma.item.create({
      data: {
        userId,
        categoryId: furnitureCategory.id,
        name: "Leather Sectional Sofa",
        brand: "IKEA",
        model: "Kivik",
        estimatedValue: 65000,
        room: "Living Room",
        condition: "good",
        coverageStatus: "partial",
      }
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error generating sample items:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
