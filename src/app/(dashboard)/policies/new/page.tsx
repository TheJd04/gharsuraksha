"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { POLICY_TYPES } from "@/lib/utils";

export default function NewPolicyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [error, setError] = useState("");
  
  // Track raw text input vs parsed data
  const [policyText, setPolicyText] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);

  const processPolicyWithAI = async () => {
    if (!policyText.trim()) {
      setError("Please paste some policy text first");
      return;
    }

    setAiProcessing(true);
    setError("");

    try {
      const res = await fetch("/api/ai/parse-policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ policyText }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to parse policy");

      setParsedData(data.result);
    } catch (err: any) {
      setError(err.message || "Failed to analyze policy text");
    } finally {
      setAiProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parsedData) return;

    setLoading(true);
    setError("");

    try {
      // In a real app, you might let users edit the parsed data first.
      // Here we submit it directly.
      const payload = {
        ...parsedData,
        rawText: policyText,
      };

      const res = await fetch("/api/policies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to save policy");

      router.push("/policies");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto fade-in pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/policies" className="p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors">
          ←
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add Insurance Policy</h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            Paste your policy text and let our AI extract the coverage details and find loopholes.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column: Text Input */}
        <div className="flex flex-col space-y-4">
          <div className="glass-card p-6 flex-1 flex flex-col">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>📄</span> Policy Document Text
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              Paste the text from your policy schedule, terms & conditions, or coverage summary here.
            </p>
            
            <textarea
              className="textarea-field flex-1 min-h-[300px] mb-4 font-mono text-xs"
              placeholder="Paste policy text here..."
              value={policyText}
              onChange={(e) => setPolicyText(e.target.value)}
              disabled={aiProcessing}
            />

            <button
              type="button"
              onClick={processPolicyWithAI}
              disabled={aiProcessing || !policyText.trim() || !!parsedData}
              className="btn-primary w-full flex justify-center items-center gap-2"
            >
              {aiProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing Policy...
                </>
              ) : parsedData ? (
                "✅ Analysis Complete"
              ) : (
                "✨ Extract Details with AI"
              )}
            </button>
            
            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Parsed Results */}
        <div>
          {parsedData ? (
            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-6 slide-in-left">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span>🤖</span> AI Extracted Details
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="label">Provider</label>
                  <input readOnly className="input-field bg-[var(--secondary)]" value={parsedData.provider} />
                </div>
                
                <div>
                  <label className="label">Type</label>
                  <input readOnly className="input-field bg-[var(--secondary)] capitalize" value={parsedData.type} />
                </div>
                
                <div>
                  <label className="label">Policy Number</label>
                  <input readOnly className="input-field bg-[var(--secondary)]" value={parsedData.policyNumber || "Not found"} />
                </div>
                
                <div>
                  <label className="label">Sum Insured (₹)</label>
                  <input readOnly className="input-field bg-[var(--secondary)] font-bold text-[var(--success)]" value={parsedData.sumInsured} />
                </div>
                
                <div>
                  <label className="label">Premium (₹)</label>
                  <input readOnly className="input-field bg-[var(--secondary)] font-medium" value={parsedData.premium} />
                </div>
              </div>

              {parsedData.warnings && parsedData.warnings.length > 0 && (
                <div className="p-4 rounded-lg bg-[var(--warning)]/10 border border-[var(--warning)]/30">
                  <h3 className="text-sm font-bold text-[var(--warning)] flex items-center gap-2 mb-2">
                    <span>⚠️</span> Important Warnings
                  </h3>
                  <ul className="list-disc list-inside text-sm text-[var(--warning)]/90 space-y-1">
                    {parsedData.warnings.map((w: string, i: number) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-4 rounded-lg bg-[var(--secondary)] border border-[var(--border)]">
                <h3 className="text-sm font-semibold mb-2">Coverage Sections Extracted:</h3>
                <div className="text-2xl font-bold gradient-text">{parsedData.coverages?.length || 0}</div>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setParsedData(null)}
                  className="btn-secondary"
                  disabled={loading}
                >
                  Edit Text
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary min-w-[150px]"
                >
                  {loading ? "Saving..." : "Save Policy"}
                </button>
              </div>
            </form>
          ) : (
            <div className="glass-card p-6 h-full flex flex-col items-center justify-center text-center space-y-4 text-[var(--muted-foreground)]">
              <div className="text-5xl opacity-50 mb-2">✨</div>
              <h3 className="text-lg font-medium text-[var(--foreground)]">Awaiting Policy Document</h3>
              <p className="text-sm max-w-xs">
                Paste your policy text and click the analyze button. Our AI will instantly structure the data and find key insights.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
