import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { policySchema } from "@/lib/schemas";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const policies = await prisma.policy.findMany({
      where: { userId: session.user.id },
      include: { coverages: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ policies });
  } catch (error) {
    console.error("Error fetching policies:", error);
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
    
    // We expect the body to have the policy form data, plus potentially an array of coverages
    // derived from the AI analysis.
    const { coverages, warnings, keyExclusions, ...policyData } = body;
    
    const parsed = policySchema.safeParse(policyData);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues?.[0]?.message || parsed.error.message },
        { status: 400 }
      );
    }

    // Begin a transaction to create policy and its coverages
    const policy = await prisma.policy.create({
      data: {
        ...parsed.data,
        userId: session.user.id,
        startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : null,
        endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
        
        // Store AI parsed fields in the parsedData JSON column
        parsedData: {
          keyExclusions: keyExclusions || [],
          warnings: warnings || []
        },
        
        coverages: coverages && Array.isArray(coverages) ? {
          create: coverages.map((cov: any) => ({
            coverageType: cov.coverageType,
            description: cov.description,
            coverageLimit: cov.coverageLimit,
            deductible: cov.deductible,
            exclusions: cov.exclusions ?? [],
            coveredCategories: cov.coveredCategories ?? [],
          }))
        } : undefined
      },
      include: { coverages: true },
    });

    return NextResponse.json({ policy }, { status: 201 });
  } catch (error) {
    console.error("Error creating policy:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
