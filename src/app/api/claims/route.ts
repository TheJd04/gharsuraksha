import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { claimSchema } from "@/lib/schemas";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const claims = await prisma.claim.findMany({
      where: { userId: session.user.id },
      include: {
        claimItems: {
          include: { item: true }
        }
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ claims });
  } catch (error) {
    console.error("Error fetching claims:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = claimSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues?.[0]?.message || parsed.error.message },
        { status: 400 }
      );
    }

    const { itemIds, ...claimData } = parsed.data;

    // Create the claim and link the selected items
    const claim = await prisma.claim.create({
      data: {
        ...claimData,
        userId: session.user.id,
        incidentDate: new Date(claimData.incidentDate),
        status: "draft",
        claimItems: {
          create: itemIds.map(itemId => ({
            item: { connect: { id: itemId } }
          }))
        }
      },
      include: {
        claimItems: {
          include: { item: true }
        }
      }
    });

    return NextResponse.json({ claim }, { status: 201 });
  } catch (error) {
    console.error("Error creating claim:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
