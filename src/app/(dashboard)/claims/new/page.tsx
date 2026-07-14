"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatCurrency, INCIDENT_TYPES } from "@/lib/utils";

export default function NewClaimPage() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    incidentType: "theft",
    incidentDate: new Date().toISOString().split('T')[0],
    description: "",
  });
  
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/items")
      .then(res => res.json())
      .then(data => {
        if (data.items) setItems(data.items);
        setFetching(false);
      })
      .catch(err => {
        console.error(err);
        setFetching(false);
      });
  }, []);

  const toggleItem = (id: string) => {
    const next = new Set(selectedItems);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedItems(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.size === 0) {
      setError("Please select at least one item for this claim");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        itemIds: Array.from(selectedItems)
      };

      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create claim");

      router.push("/claims");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectedTotal = items
    .filter(i => selectedItems.has(i.id))
    .reduce((sum, i) => sum + i.estimatedValue, 0);

  return (
    <div className="max-w-5xl mx-auto fade-in pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/claims" className="p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors">
          ←
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Generate Claim Report</h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            Select items from your inventory to generate a structured PDF claim report.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="glass-card p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-4">Incident Details</h2>
            
            {error && (
              <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="label">Claim Title *</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Summer Flood Damage 2026"
                  required
                />
              </div>

              <div>
                <label className="label">Incident Type *</label>
                <select
                  name="incidentType"
                  value={formData.incidentType}
                  onChange={handleChange}
                  className="select-field"
                  required
                >
                  {INCIDENT_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Date of Incident *</label>
                <input
                  type="date"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="label">Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea-field"
                  placeholder="Describe what happened..."
                  rows={4}
                />
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[var(--border)]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-[var(--muted-foreground)]">Selected Items</span>
                <span className="font-bold">{selectedItems.size}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-[var(--muted-foreground)]">Total Claim Value</span>
                <span className="text-xl font-bold gradient-text">{formatCurrency(selectedTotal)}</span>
              </div>
              
              <button
                type="submit"
                disabled={loading || selectedItems.size === 0}
                className="btn-primary w-full"
              >
                {loading ? "Generating..." : "Generate Claim Report"}
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="glass-card p-6 min-h-[600px]">
            <h2 className="text-lg font-semibold mb-4 flex justify-between items-center">
              <span>Select Affected Items</span>
              <span className="text-sm font-normal text-[var(--muted-foreground)]">
                {items.length} items available
              </span>
            </h2>

            {fetching ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-16 shimmer rounded-lg"></div>
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-12 text-[var(--muted-foreground)]">
                No items in inventory. Add items first.
              </div>
            ) : (
              <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2">
                {items.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center gap-4 ${
                      selectedItems.has(item.id)
                        ? "bg-[var(--primary)]/10 border-[var(--primary)]"
                        : "bg-[var(--background)] border-[var(--border)] hover:border-[var(--primary)]/50"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md border flex items-center justify-center flex-shrink-0 ${
                      selectedItems.has(item.id)
                        ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                        : "border-[var(--border)]"
                    }`}>
                      {selectedItems.has(item.id) && "✓"}
                    </div>
                    
                    <div className="text-2xl">{item.category.icon}</div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{item.name}</div>
                      <div className="text-xs text-[var(--muted-foreground)] flex gap-2">
                        <span>{item.category.name}</span>
                        {item.room && <span>• {item.room}</span>}
                      </div>
                    </div>
                    
                    <div className="font-bold whitespace-nowrap text-right">
                      {formatCurrency(item.estimatedValue)}
                      <div className={`text-xs mt-0.5 ${item.coverageStatus === 'covered' ? 'text-[var(--success)]' : item.coverageStatus === 'uncovered' ? 'text-[var(--destructive)]' : 'text-[var(--warning)]'}`}>
                        {item.coverageStatus}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
