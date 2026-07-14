import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { aiModel } from "@/lib/ai";
import { generateObject } from "ai";
import { aiPolicyParseSchema } from "@/lib/schemas";

export const maxDuration = 45; // Complex text analysis needs more time

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { policyText } = await request.json();

    if (!policyText || typeof policyText !== "string") {
      return NextResponse.json({ error: "Policy text is required" }, { status: 400 });
    }

    // Process policy with Gemini
    const { object } = await generateObject({
      model: aiModel,
      schema: aiPolicyParseSchema,
      prompt: `Analyze the following Indian insurance policy document. Extract the key details, coverage limits, deductibles, and specifically look for "traps", loopholes, or major exclusions that the policyholder should be aware of. 
      
      Policy Document Text:
      ${policyText.substring(0, 30000)} // Limit text length for API
      `,
    });

    return NextResponse.json({ result: object });
  } catch (error) {
    console.error("AI Policy parsing error:", error);
    return NextResponse.json(
      { error: "Failed to parse policy document. Please enter details manually." },
      { status: 500 }
    );
  }
}
