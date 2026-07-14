"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Policy, PolicyCoverage } from "@prisma/client";

type PolicyWithCoverages = Policy & { coverages: PolicyCoverage[] };

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<PolicyWithCoverages[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    fetchPolicies();
  }, []);

  async function fetchPolicies() {
    try {
      const res = await fetch("/api/policies");
      const data = await res.json();
      if (data.policies) {
        setPolicies(data.policies);
      }
    } catch (error) {
      console.error("Failed to fetch policies:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSeedPolicies() {
    setSeeding(true);
    try {
      const res = await fetch("/api/seed-policies", { method: "POST" });
      if (res.ok) {
        await fetchPolicies();
      }
    } catch (error) {
      console.error("Failed to seed policies:", error);
    } finally {
      setSeeding(false);
    }
  }

  const activePolicies = policies.filter(
    (p) => p.status === "active" && (!p.endDate || new Date(p.endDate) > new Date())
  );
  
  const totalCoverage = activePolicies.reduce((sum, p) => sum + p.sumInsured, 0);
  const totalPremium = activePolicies.reduce((sum, p) => sum + p.premium, 0);

  return (
    <div className="max-w-6xl mx-auto fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Policies</h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            Manage your insurance policies and view coverage limits.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleSeedPolicies} 
            disabled={seeding || loading}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50"
          >
            {seeding ? "Generating..." : "🧪 Generate Samples"}
          </button>
          <Link href="/policies/new" className="btn-primary flex items-center gap-2">
            <span>➕</span> Add Policy
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-card flex items-center gap-4 px-6 py-4">
          <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center text-xl">
            📋
          </div>
          <div>
            <div className="text-sm text-[var(--muted-foreground)]">Active Policies</div>
            <div className="text-xl font-bold">{activePolicies.length}</div>
          </div>
        </div>
        <div className="glass-card flex items-center gap-4 px-6 py-4">
          <div className="w-12 h-12 rounded-full bg-[var(--success)]/10 text-[var(--success)] flex items-center justify-center text-xl">
            🛡️
          </div>
          <div>
            <div className="text-sm text-[var(--muted-foreground)]">Total Coverage</div>
            <div className="text-xl font-bold">{formatCurrency(totalCoverage)}</div>
          </div>
        </div>
        <div className="glass-card flex items-center gap-4 px-6 py-4">
          <div className="w-12 h-12 rounded-full bg-[var(--warning)]/10 text-[var(--warning)] flex items-center justify-center text-xl">
            💰
          </div>
          <div>
            <div className="text-sm text-[var(--muted-foreground)]">Annual Premium</div>
            <div className="text-xl font-bold">{formatCurrency(totalPremium)}</div>
          </div>
        </div>
      </div>

      {/* Policies List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="glass-card h-48 shimmer rounded-xl border-none"></div>
          ))}
        </div>
      ) : policies.length === 0 ? (
        <div className="glass-card p-12 text-center empty-state mt-4">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-xl font-bold mb-2">No policies found</h3>
          <p className="text-[var(--muted-foreground)] mb-6 max-w-md">
            You haven&apos;t added any insurance policies yet. Add your policies to analyze your coverage and find gaps.
          </p>
          <Link href="/policies/new" className="btn-primary">
            Upload First Policy
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {policies.map((policy) => {
            const isActive = policy.status === "active" && (!policy.endDate || new Date(policy.endDate) > new Date());
            
            return (
              <div key={policy.id} className="glass-card overflow-hidden">
                <div className="p-6 border-b border-[var(--border)] flex flex-col md:flex-row md:items-start justify-between gap-4 bg-gradient-to-r from-[var(--secondary)] to-[var(--background)]">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold">{policy.provider}</h2>
                      <span className={`badge ${isActive ? 'badge-success' : 'badge-neutral'}`}>
                        {isActive ? 'Active' : 'Inactive'}
                      </span>
                      <span className="badge badge-info uppercase">{policy.type}</span>
                    </div>
                    {policy.policyNumber && (
                      <p className="text-[var(--muted-foreground)] text-sm mb-1">
                        Policy #: <span className="font-medium text-[var(--foreground)]">{policy.policyNumber}</span>
                      </p>
                    )}
                    {(policy.startDate || policy.endDate) && (
                      <p className="text-sm text-[var(--muted-foreground)]">
                        Valid: {policy.startDate ? formatDate(policy.startDate) : '?'} — {policy.endDate ? formatDate(policy.endDate) : '?'}
                      </p>
                    )}
                  </div>
                  
                  <div className="text-left md:text-right">
                    <div className="text-sm text-[var(--muted-foreground)] mb-1">Sum Insured</div>
                    <div className="text-2xl font-bold text-[var(--success)] mb-1">
                      {formatCurrency(policy.sumInsured)}
                    </div>
                    <div className="text-sm">
                      Premium: <span className="font-medium">{formatCurrency(policy.premium)}/yr</span>
                    </div>
                  </div>
                </div>
                
                {/* Coverages preview */}
                <div className="p-6">
                  <h3 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-4">
                    Coverage Sections ({policy.coverages.length})
                  </h3>
                  
                  {policy.coverages.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {policy.coverages.slice(0, 4).map((coverage) => (
                        <div key={coverage.id} className="p-4 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{coverage.coverageType}</h4>
                            <span className="font-bold text-sm text-[var(--primary)]">
                              {formatCurrency(coverage.coverageLimit)}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--muted-foreground)] line-clamp-2">
                            {coverage.description}
                          </p>
                        </div>
                      ))}
                      {policy.coverages.length > 4 && (
                        <div className="p-4 rounded-lg bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center text-sm font-medium text-[var(--muted-foreground)] cursor-pointer hover:text-[var(--foreground)] transition-colors">
                          + {policy.coverages.length - 4} more coverages
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--muted-foreground)] italic mb-6">No specific coverage sections defined.</p>
                  )}
                  
                  {/* Warnings */}
                  {(policy.parsedData as any)?.warnings && (() => {
                    try {
                      const warnings = (policy.parsedData as any).warnings;
                      if (warnings && warnings.length > 0) {
                        return (
                          <div className="mb-6 p-4 rounded-lg bg-[var(--warning)]/10 border border-[var(--warning)]/30">
                            <h3 className="text-sm font-bold text-[var(--warning)] flex items-center gap-2 mb-2">
                              <span>⚠️</span> AI Identified Traps/Warnings
                            </h3>
                            <ul className="list-disc list-inside text-sm text-[var(--warning)]/90 space-y-1">
                              {warnings.slice(0, 2).map((w: string, i: number) => (
                                <li key={i}>{w}</li>
                              ))}
                              {warnings.length > 2 && (
                                <li className="list-none text-xs mt-2 italic">+ {warnings.length - 2} more warnings</li>
                              )}
                            </ul>
                          </div>
                        );
                      }
                    } catch (e) {
                      return null;
                    }
                  })()}
                  
                  <div className="flex justify-end pt-4 border-t border-[var(--border)]">
                    <Link 
                      href={`/policies/${policy.id}`}
                      className="btn-secondary"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
