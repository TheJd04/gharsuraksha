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

    // Check if user has any items
    let item = await prisma.item.findFirst({
      where: { userId }
    });

    if (!item) {
      // Create a dummy item if none exists
      let category = await prisma.category.findFirst({
        where: { name: "Electronics" }
      });
      if (!category) {
        category = await prisma.category.create({
          data: { name: "Electronics", icon: "💻", isPreseeded: true }
        });
      }
      
      item = await prisma.item.create({
        data: {
          userId,
          categoryId: category.id,
          name: "Sample MacBook",
          brand: "Apple",
          estimatedValue: 150000,
        }
      });
    }

    // Create Sample Claim
    const claim = await prisma.claim.create({
      data: {
        userId,
        title: "Water Damage to Electronics",
        incidentType: "flood",
        incidentDate: new Date(),
        description: "A pipe burst in the living room causing water damage.",
        status: "submitted",
        totalValue: item.estimatedValue,
        claimItems: {
          create: [
            {
              itemId: item.id,
              claimedValue: item.estimatedValue,
              damageDescription: "Complete water damage, unable to turn on.",
            }
          ]
        }
      }
    });

    return NextResponse.json({ success: true, claimId: claim.id }, { status: 201 });
  } catch (error) {
    console.error("Error generating sample claims:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
