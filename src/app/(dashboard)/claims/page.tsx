"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ClaimsPage() {
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClaims();
  }, []);

  async function fetchClaims() {
    try {
      const res = await fetch("/api/claims");
      const data = await res.json();
      if (data.claims) {
        setClaims(data.claims);
      }
    } catch (error) {
      console.error("Failed to fetch claims:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Insurance Claims</h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            Manage your claims and generate structured reports for your insurer.
          </p>
        </div>
        <Link href="/claims/new" className="btn-primary flex items-center gap-2">
          <span>➕</span> New Claim Report
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="glass-card h-32 shimmer rounded-xl border-none"></div>
          ))}
        </div>
      ) : claims.length === 0 ? (
        <div className="glass-card p-12 text-center empty-state mt-4">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-xl font-bold mb-2">No claims generated yet</h3>
          <p className="text-[var(--muted-foreground)] mb-6 max-w-md">
            If you've suffered a loss, you can select items from your inventory and generate a structured PDF report to submit to your insurer.
          </p>
          <Link href="/claims/new" className="btn-primary">
            Create First Claim
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {claims.map((claim) => {
            const totalClaimValue = claim.claimItems.reduce((sum: number, ci: any) => sum + ci.item.estimatedValue, 0);
            
            return (
              <div key={claim.id} className="glass-card overflow-hidden">
                <div className="p-6 border-b border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[var(--secondary)] to-[var(--background)]">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold">{claim.title}</h2>
                      <span className={`badge ${claim.status === 'draft' ? 'badge-neutral' : claim.status === 'submitted' ? 'badge-info' : 'badge-success'}`}>
                        {claim.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Incident: <span className="font-medium text-[var(--foreground)] capitalize">{claim.incidentType}</span> • Date: {formatDate(claim.incidentDate)}
                    </p>
                  </div>
                  
                  <div className="text-left md:text-right">
                    <div className="text-sm text-[var(--muted-foreground)] mb-1">Total Claim Value</div>
                    <div className="text-2xl font-bold text-[var(--primary)]">
                      {formatCurrency(totalClaimValue)}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-2">Affected Items ({claim.claimItems.length})</h3>
                    <div className="flex flex-wrap gap-2">
                      {claim.claimItems.map((ci: any) => (
                        <div key={ci.id} className="px-3 py-1.5 bg-[var(--background)] border border-[var(--border)] rounded-md text-sm flex items-center gap-2">
                          <span className="truncate max-w-[150px]">{ci.item.name}</span>
                          <span className="font-medium text-[var(--primary)]">{formatCurrency(ci.item.estimatedValue)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
                    <Link 
                      href={`/claims/${claim.id}`}
                      className="btn-secondary"
                    >
                      View Details
                    </Link>
                    <button
                      className="btn-primary"
                      onClick={() => alert("In a production app, this would trigger client-side PDF generation using @react-pdf/renderer")}
                    >
                      📄 Download PDF Report
                    </button>
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
