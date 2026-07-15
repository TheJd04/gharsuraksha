"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import type { AIGapAnalysisResult } from "@/lib/schemas";
import { PrintButton } from "@/components/ui/print-button";

export default function CoveragePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState<AIGapAnalysisResult | null>(null);

  const runAnalysis = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/ai/gap-analysis", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to analyze coverage");

      setAnalysis(data.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Coverage Gap Analyzer</h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            Cross-reference your inventory against your policies to find hidden risks.
          </p>
        </div>
        <div className="flex gap-2">
          {analysis && <PrintButton />}
          <button
            onClick={runAnalysis}
            disabled={loading}
            className="btn-primary flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              <>
                <span>🔍</span> Run New Analysis
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl">
          {error}
        </div>
      )}

      {!analysis && !loading && !error && (
        <div className="glass-card p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-6xl mb-6">🔍</div>
          <h2 className="text-2xl font-bold mb-2">Find Your Coverage Gaps</h2>
          <p className="text-[var(--muted-foreground)] max-w-md mb-8">
            Our AI will match every item in your inventory against the terms, limits, and exclusions of your active insurance policies.
          </p>
          <button onClick={runAnalysis} className="btn-primary px-8 py-3 text-lg">
            Start Analysis
          </button>
        </div>
      )}

      {loading && !analysis && (
        <div className="glass-card p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-4 border-[var(--border)] rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-3xl">🤖</div>
          </div>
          <h2 className="text-xl font-bold mb-2">AI is Analyzing Your Portfolio</h2>
          <p className="text-[var(--muted-foreground)] max-w-sm">
            Reading policy documents, checking exclusions, and matching inventory categories...
          </p>
        </div>
      )}

      {analysis && (
        <div className="space-y-8 slide-in-left">
          {/* Top Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-4">
              <div className="text-sm text-[var(--muted-foreground)] mb-1">Total Inventory</div>
              <div className="text-2xl font-bold">{formatCurrency(analysis.totalInventoryValue)}</div>
            </div>
            <div className="glass-card p-4 border-b-4 border-b-[var(--success)]">
              <div className="text-sm text-[var(--muted-foreground)] mb-1">Fully Covered</div>
              <div className="text-2xl font-bold text-[var(--success)]">{formatCurrency(analysis.totalCoveredValue)}</div>
            </div>
            <div className="glass-card p-4 border-b-4 border-b-[var(--destructive)]">
              <div className="text-sm text-[var(--muted-foreground)] mb-1">Not Covered</div>
              <div className="text-2xl font-bold text-[var(--destructive)]">{formatCurrency(analysis.totalUncoveredValue)}</div>
            </div>
            <div className="glass-card p-4 bg-[var(--primary)]/5 border-[var(--primary)]/30">
              <div className="text-sm text-[var(--muted-foreground)] mb-1">Coverage Score</div>
              <div className="text-3xl font-bold gradient-text">{analysis.coveragePercentage}%</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Actionable Recommendations */}
            <div className="glass-card p-6 md:col-span-2 bg-gradient-to-r from-[var(--secondary)] to-[var(--background)]">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                <span>💡</span> AI Recommendations
              </h3>
              <ul className="space-y-3">
                {analysis.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[var(--primary)] mt-1">✓</span>
                    <span className="leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Uncovered Items (Critical) */}
            <div className="glass-card p-6 border border-[var(--destructive)]/30">
              <h3 className="text-lg font-bold text-[var(--destructive)] flex items-center gap-2 mb-4">
                <span>⚠️</span> Critical Gaps (Uncovered)
              </h3>
              {analysis.uncoveredItems.length === 0 ? (
                <p className="text-[var(--success)] font-medium">All items have some form of coverage!</p>
              ) : (
                <div className="space-y-4">
                  {analysis.uncoveredItems.map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold">{item.itemName}</span>
                        <span className="font-bold text-[var(--destructive)]">{formatCurrency(item.itemValue)}</span>
                      </div>
                      <p className="text-xs text-[var(--muted-foreground)] mb-2"><span className="font-medium text-[var(--foreground)]">Reason:</span> {item.reason}</p>
                      <p className="text-xs text-[var(--warning)]"><span className="font-medium">Fix:</span> {item.recommendation}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Underinsured Items */}
            <div className="glass-card p-6 border border-[var(--warning)]/30">
              <h3 className="text-lg font-bold text-[var(--warning)] flex items-center gap-2 mb-4">
                <span>📉</span> Underinsured Items
              </h3>
              {analysis.underinsuredItems.length === 0 ? (
                <p className="text-[var(--success)] font-medium">No underinsured items found.</p>
              ) : (
                <div className="space-y-4">
                  {analysis.underinsuredItems.map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold">{item.itemName}</span>
                        <span className="font-bold">{formatCurrency(item.itemValue)}</span>
                      </div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[var(--muted-foreground)]">Coverage Limit:</span>
                        <span className="font-medium">{formatCurrency(item.currentCoverage)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-[var(--warning)] font-bold">
                        <span>Shortfall Gap:</span>
                        <span>{formatCurrency(item.gap)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
