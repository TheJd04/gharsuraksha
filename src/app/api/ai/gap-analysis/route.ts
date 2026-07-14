import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { aiModel } from "@/lib/ai";
import { generateObject } from "ai";
import { aiGapAnalysisSchema } from "@/lib/schemas";
import { prisma } from "@/lib/prisma";

export const maxDuration = 45;

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch all user's items and active policies
    const [items, policies] = await Promise.all([
      prisma.item.findMany({ 
        where: { userId },
        include: { category: true }
      }),
      prisma.policy.findMany({ 
        where: { 
          userId, 
          status: "active",
          OR: [
            { endDate: null },
            { endDate: { gt: new Date() } }
          ]
        },
        include: { coverages: true }
      }),
    ]);

    if (items.length === 0) {
      return NextResponse.json({ error: "Please add some items to your inventory first." }, { status: 400 });
    }

    if (policies.length === 0) {
      return NextResponse.json({ error: "Please add an active insurance policy to analyze gaps." }, { status: 400 });
    }

    // Simplify data to send to AI
    const inventoryData = items.map(i => ({
      name: i.name,
      category: i.category.name,
      value: i.estimatedValue,
      id: i.id
    }));

    const policyData = policies.map(p => ({
      provider: p.provider,
      type: p.type,
      totalLimit: p.sumInsured,
      coverages: p.coverages.map(c => ({
        type: c.coverageType,
        limit: c.coverageLimit,
        deductible: c.deductible,
        categoriesCovered: c.coveredCategories,
        exclusions: c.exclusions
      })),
      keyExclusions: (p.parsedData as any)?.keyExclusions
    }));

    // Process with Gemini
    const { object } = await generateObject({
      model: aiModel,
      schema: aiGapAnalysisSchema,
      prompt: `Act as an expert Indian Insurance Assessor. Analyze this user's home inventory against their active insurance policies.
      
      Your task is to:
      1. Determine exactly which items are covered by which policy.
      2. Identify items that are NOT covered (e.g. high-value jewelry might not be covered by a standard contents policy).
      3. Identify under-insured items (e.g. total value of electronics is 5L, but electronics coverage limit is only 2L).
      4. Provide actionable recommendations.
      
      Inventory:
      ${JSON.stringify(inventoryData, null, 2)}
      
      Active Policies:
      ${JSON.stringify(policyData, null, 2)}
      
      Output the structured analysis carefully. Be pessimistic about coverage if exclusions apply (e.g. cash is usually excluded).
      `,
    });

    // Update the database with the new coverage status for items
    const updatePromises = [];
    
    for (const item of object.coveredItems) {
      const dbItem = inventoryData.find(i => i.name === item.itemName);
      if (dbItem) {
        updatePromises.push(
          prisma.item.update({
            where: { id: dbItem.id },
            data: { coverageStatus: "covered" }
          })
        );
      }
    }

    for (const item of object.uncoveredItems) {
      const dbItem = inventoryData.find(i => i.name === item.itemName);
      if (dbItem) {
        updatePromises.push(
          prisma.item.update({
            where: { id: dbItem.id },
            data: { coverageStatus: "uncovered" }
          })
        );
      }
    }

    for (const item of object.underinsuredItems) {
      const dbItem = inventoryData.find(i => i.name === item.itemName);
      if (dbItem) {
        updatePromises.push(
          prisma.item.update({
            where: { id: dbItem.id },
            data: { coverageStatus: "partial" }
          })
        );
      }
    }

    // Run updates in background
    Promise.all(updatePromises).catch(console.error);

    return NextResponse.json({ result: object });
  } catch (error) {
    console.error("AI Gap Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to perform gap analysis. Please try again." },
      { status: 500 }
    );
  }
}
