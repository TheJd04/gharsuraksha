import { auth } from "@/lib/auth";
import { aiModel } from "@/lib/ai";
import { streamText } from "ai";
import { prisma } from "@/lib/prisma";

export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages } = await req.json();

  // Fetch user context to pass to the AI
  const [items, policies] = await Promise.all([
    prisma.item.findMany({ 
      where: { userId: session.user.id },
      include: { category: true }
    }),
    prisma.policy.findMany({ 
      where: { userId: session.user.id, status: "active" },
      include: { coverages: true }
    }),
  ]);

  const totalValue = items.reduce((acc, item) => acc + item.estimatedValue, 0);

  const systemContext = `
You are the GharSuraksha AI Insurance Advisor, an expert in Indian home insurance, contents insurance, and claims processing.
You are helping the user, ${session.user.name}.

Here is their current portfolio context:
- They have ${items.length} items in their inventory worth a total of ₹${totalValue}.
- Top 5 most valuable items: ${items.sort((a, b) => b.estimatedValue - a.estimatedValue).slice(0, 5).map(i => `${i.name} (₹${i.estimatedValue})`).join(", ")}
- They have ${policies.length} active insurance policies:
${policies.map(p => `  * ${p.provider} ${p.type} Policy (Limit: ₹${p.sumInsured})`).join("\n")}

Your goals:
1. Answer questions about their specific inventory and coverage.
2. Identify loopholes or traps (e.g., depreciation clauses, FIR requirements for theft, 30-day vacancy clauses).
3. Provide practical advice on what to do BEFORE a claim, and what to do AFTER an incident.
4. Keep answers concise, professional, and formatted nicely. Use ₹ for currency.
  `;

  const result = streamText({
    model: aiModel,
    system: systemContext,
    messages,
  });

  return result.toTextStreamResponse();
}
