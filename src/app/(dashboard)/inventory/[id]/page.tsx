"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ItemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await fetch(`/api/items/${params.id}`);
        if (!response.ok) throw new Error("Failed to load item");
        const data = await response.json();
        setItem(data.item);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchItem();
    }
  }, [params.id]);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this item? This action cannot be undone.")) return;
    
    try {
      const response = await fetch(`/api/items/${params.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete item");
      router.push("/inventory");
    } catch (err) {
      alert("Failed to delete item. Please try again.");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-[var(--destructive)] mb-4">{error || "Item not found"}</h2>
        <Link href="/inventory" className="text-[var(--primary)] hover:underline">
          &larr; Back to Inventory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="flex items-center justify-between">
        <Link 
          href="/inventory" 
          className="text-[var(--muted-foreground)] hover:text-white transition-colors flex items-center gap-2"
        >
          <span>&larr;</span> Back to Inventory
        </Link>
        <div className="flex gap-4">
          <button 
            onClick={handleDelete}
            className="px-4 py-2 bg-[var(--destructive)]/10 text-[var(--destructive)] rounded-lg hover:bg-[var(--destructive)]/20 transition-colors font-medium text-sm"
          >
            Delete Item
          </button>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <span className="text-9xl">📦</span>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs font-semibold tracking-wide uppercase border border-[var(--primary)]/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]">
              {item.category?.name || "Uncategorized"}
            </span>
            {item.condition && (
              <span className="px-3 py-1 bg-[var(--muted)] text-[var(--muted-foreground)] rounded-full text-xs font-medium border border-[var(--border)]">
                Condition: {item.condition}
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
            {item.name}
          </h1>
          
          {item.brand && (
            <p className="text-xl text-[var(--muted-foreground)] font-light">
              {item.brand} {item.model ? `• ${item.model}` : ''}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-xl border border-[var(--border)]">
          <h3 className="text-sm uppercase tracking-wider text-[var(--muted-foreground)] mb-4 font-semibold">
            Value & Location
          </h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-[var(--muted-foreground)] mb-1">Estimated Value</p>
              <p className="text-3xl font-bold text-[var(--success)]">
                {formatCurrency(item.estimatedValue)}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border)]/50">
              <div>
                <p className="text-sm text-[var(--muted-foreground)] mb-1">Room / Location</p>
                <p className="font-medium">{item.location || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--muted-foreground)] mb-1">Purchase Date</p>
                <p className="font-medium">{item.purchaseDate ? formatDate(item.purchaseDate) : "Unknown"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-[var(--border)]">
          <h3 className="text-sm uppercase tracking-wider text-[var(--muted-foreground)] mb-4 font-semibold">
            Additional Details
          </h3>
          
          {item.notes ? (
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {item.notes}
              </p>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-[var(--muted-foreground)] opacity-50 py-8">
              <span className="text-3xl mb-2">📝</span>
              <p>No additional notes provided.</p>
            </div>
          )}
        </div>
      </div>
      
      {item.imageUrl && (
        <div className="glass-panel p-6 rounded-xl border border-[var(--border)]">
          <h3 className="text-sm uppercase tracking-wider text-[var(--muted-foreground)] mb-4 font-semibold">
            Item Photo
          </h3>
          <div className="rounded-lg overflow-hidden border border-[var(--border)]/50">
            {/* Using img instead of Next Image to handle external URLs more easily without domains config */}
            <img 
              src={item.imageUrl} 
              alt={item.name}
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
