import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { aiVisionModel } from "@/lib/ai";
import { generateObject } from "ai";
import { aiCatalogSchema } from "@/lib/schemas";
import { prisma } from "@/lib/prisma";

export const maxDuration = 30; // Extend Vercel timeout for AI processing

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { imageBase64 } = await request.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Process image with Gemini Vision
    const { object } = await generateObject({
      model: aiVisionModel,
      schema: aiCatalogSchema,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image of a household item from India. Identify what it is, its category, brand/model if visible, estimate its current market value in INR (Indian Rupees), and determine its condition. Be precise and realistic with the valuation.",
            },
            {
              type: "image",
              image: imageBase64,
            },
          ],
        },
      ],
    });

    // Try to auto-match category to existing DB categories or pick a default
    let matchedCategory = await prisma.category.findFirst({
      where: { name: { contains: object.category, mode: "insensitive" } },
    });

    if (!matchedCategory) {
      // Fallback to "Other" category
      matchedCategory = await prisma.category.findFirst({
        where: { name: "Other" },
      });
    }

    return NextResponse.json({
      result: {
        ...object,
        categoryId: matchedCategory?.id || "",
        categoryName: matchedCategory?.name || object.category,
      },
    });
  } catch (error) {
    console.error("AI Cataloging error:", error);
    return NextResponse.json(
      { error: "Failed to process image. Please try again." },
      { status: 500 }
    );
  }
}
