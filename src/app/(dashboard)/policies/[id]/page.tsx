import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import { TooltipEducation } from "@/components/ui/tooltip-education";
import { ArrowLeft, AlertTriangle, Info, ShieldCheck, HelpCircle } from "lucide-react";

export default async function PolicyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { id } = await params;

  const policy = await prisma.policy.findFirst({
    where: { id, userId: session.user.id },
    include: { coverages: true },
  });

  if (!policy) {
    redirect("/policies");
  }

  const isActive = policy.status === "active" && (!policy.endDate || new Date(policy.endDate) > new Date());
  
  // Extract AI Parsed Data
  const parsedData = (policy.parsedData as any) || {};
  const warnings = parsedData.warnings || [];
  const inclusions = parsedData.inclusions || ["Standard items defined by the provider."];
  const exclusions = parsedData.exclusions || ["Read your full policy document to understand exclusions."];

  return (
    <div className="max-w-4xl mx-auto fade-in pb-12">
      <Link href="/policies" className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-6 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Policies
      </Link>

      {/* Header Section */}
      <div className="glass-panel p-8 mb-8 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{policy.provider}</h1>
              <span className={`badge ${isActive ? 'badge-success' : 'badge-neutral'}`}>
                {isActive ? 'Active' : 'Inactive'}
              </span>
              <span className="badge badge-info uppercase">{policy.type}</span>
            </div>
            
            {policy.policyNumber && (
              <p className="text-[var(--muted-foreground)] text-lg mb-2">
                Policy #: <span className="font-medium text-[var(--foreground)]">{policy.policyNumber}</span>
              </p>
            )}
            
            {(policy.startDate || policy.endDate) && (
              <p className="text-sm text-[var(--muted-foreground)] flex items-center gap-2">
                <span className="opacity-75">📅</span>
                Valid: {policy.startDate ? formatDate(policy.startDate) : '?'} — {policy.endDate ? formatDate(policy.endDate) : '?'}
              </p>
            )}
          </div>

          <div className="text-left md:text-right bg-black/20 p-4 rounded-xl border border-[var(--border)]/50 backdrop-blur-sm">
            <div className="text-sm text-[var(--muted-foreground)] mb-1">
              <TooltipEducation term="Sum Insured" definition="The maximum amount the insurance company will pay you for a covered loss.">
                Sum Insured
              </TooltipEducation>
            </div>
            <div className="text-3xl font-bold text-[var(--success)] mb-1">
              {formatCurrency(policy.sumInsured)}
            </div>
            <div className="text-sm">
              <TooltipEducation term="Premium" definition="The cost you pay per year to keep this insurance policy active.">
                Premium
              </TooltipEducation>: <span className="font-medium">{formatCurrency(policy.premium)}/yr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage Grid */}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-[var(--primary)]" />
        Coverage Limits
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {policy.coverages.length > 0 ? (
          policy.coverages.map((coverage) => (
            <div key={coverage.id} className="glass-card p-5 border-l-4 border-l-[var(--primary)]">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-lg">{coverage.coverageType}</h4>
                <span className="font-bold text-[var(--primary)]">
                  {formatCurrency(coverage.coverageLimit)}
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">
                {coverage.description}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full p-6 glass-card text-center text-[var(--muted-foreground)] italic">
            No specific coverage limits defined.
          </div>
        )}
      </div>

      {/* THE FINE PRINT EXPLAINED (EDTECH FEATURE) */}
      <div className="glass-panel border border-[var(--warning)]/30 overflow-hidden relative">
        {/* Banner header */}
        <div className="bg-[var(--warning)]/10 p-5 border-b border-[var(--warning)]/20 flex items-center gap-3">
          <div className="p-2 bg-[var(--warning)]/20 rounded-lg text-[var(--warning)]">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--warning)]">The Fine Print (Explained)</h2>
            <p className="text-sm text-[var(--muted-foreground)] text-white/70">
              AI-generated tutor analysis of your policy's complex terms.
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          
          {/* Warnings Section */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-[var(--destructive)]">
              <AlertTriangle className="w-5 h-5" />
              Traps & Warnings
            </h3>
            {warnings.length > 0 ? (
              <ul className="space-y-3">
                {warnings.map((w: string, i: number) => (
                  <li key={i} className="flex gap-3 bg-[var(--destructive)]/5 p-4 rounded-lg border border-[var(--destructive)]/10">
                    <span className="text-[var(--destructive)] shrink-0 mt-0.5">⚠️</span>
                    <span className="text-sm leading-relaxed">{w}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[var(--muted-foreground)] bg-black/20 p-4 rounded-lg">No critical warnings identified.</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Exclusions */}
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <span className="text-[var(--destructive)]">❌</span> What's NOT Covered
              </h3>
              <ul className="space-y-2">
                {exclusions.map((exc: string, i: number) => (
                  <li key={i} className="flex gap-2 items-start text-sm">
                    <span className="text-[var(--muted-foreground)] mt-0.5">•</span>
                    <span className="leading-relaxed opacity-90">{exc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inclusions */}
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <span className="text-[var(--success)]">✅</span> What IS Covered
              </h3>
              <ul className="space-y-2">
                {inclusions.map((inc: string, i: number) => (
                  <li key={i} className="flex gap-2 items-start text-sm">
                    <span className="text-[var(--success)] mt-0.5">✓</span>
                    <span className="leading-relaxed opacity-90">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Tutor Box */}
          <div className="bg-[var(--secondary)] p-5 rounded-xl border border-[var(--border)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Info className="w-24 h-24" />
            </div>
            <h4 className="font-bold text-[var(--primary)] mb-2 relative z-10">Financial Tutor Note:</h4>
            <p className="text-sm leading-relaxed text-[var(--muted-foreground)] relative z-10">
              When a policy mentions <TooltipEducation term="Exclusions" definition="Specific situations, conditions, or property that the insurance policy does not cover.">exclusions</TooltipEducation>, these are scenarios where you are entirely responsible for the financial loss. It's crucial to understand these gaps so you can purchase an <TooltipEducation term="Umbrella Policy" definition="Extra liability insurance that goes beyond the limits of your standard policies.">umbrella policy</TooltipEducation> or an endorsement if necessary.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
