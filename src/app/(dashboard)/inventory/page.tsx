"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Item, Category } from "@prisma/client";
import { PrintButton } from "@/components/ui/print-button";

type ItemWithCategory = Item & { category: Category };

export default function InventoryPage() {
  const [items, setItems] = useState<ItemWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const res = await fetch("/api/items");
      const data = await res.json();
      if (data.items) {
        setItems(data.items);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Map(data.items.map((item: ItemWithCategory) => [item.categoryId, item.category])).values()
        ) as Category[];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSeedItems() {
    setIsSeeding(true);
    try {
      await fetch("/api/seed-items", { method: "POST" });
      await fetchItems();
    } catch (error) {
      console.error("Failed to seed items:", error);
    } finally {
      setIsSeeding(false);
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          (item.brand && item.brand.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = filterCategory === "all" || item.categoryId === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalValue = filteredItems.reduce((sum, item) => sum + item.estimatedValue, 0);

  return (
    <div className="max-w-6xl mx-auto fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Inventory</h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            Manage your household items, electronics, and valuables.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSeedItems} 
            disabled={isSeeding}
            className="btn-secondary flex items-center gap-2"
          >
            {isSeeding ? "Generating..." : "🧪 Test Run"}
          </button>
          <PrintButton />
          <Link href="/inventory/new" className="btn-primary flex items-center gap-2">
            <span>➕</span> Add Item
          </Link>
        </div>
      </div>

      {/* Filters and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search items by name or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field flex-1"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="select-field sm:w-48"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="glass-card flex items-center justify-between px-4 py-2 border-[var(--primary)]/30">
          <span className="text-sm font-medium">Filtered Value:</span>
          <span className="text-lg font-bold gradient-text">{formatCurrency(totalValue)}</span>
        </div>
      </div>

      {/* Items List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card h-48 shimmer rounded-xl border-none"></div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="glass-card p-12 text-center empty-state mt-4">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-xl font-bold mb-2">No items found</h3>
          <p className="text-[var(--muted-foreground)] mb-6 max-w-md">
            {search || filterCategory !== "all" 
              ? "We couldn't find any items matching your filters. Try adjusting your search."
              : "Your inventory is currently empty. Start by adding your first item, either manually or by taking a photo."}
          </p>
          {(search || filterCategory !== "all") ? (
            <button 
              onClick={() => { setSearch(""); setFilterCategory("all"); }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          ) : (
            <Link href="/inventory/new" className="btn-primary">
              Add First Item
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="glass-card overflow-hidden group">
              <div className="p-5 border-b border-[var(--border)] bg-gradient-to-br from-[var(--secondary)] to-[var(--background)]">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    <span>{item.category.icon}</span>
                    <span>{item.category.name}</span>
                  </div>
                  <div className={`badge ${
                    item.coverageStatus === "covered" ? "badge-success" :
                    item.coverageStatus === "uncovered" ? "badge-danger" :
                    item.coverageStatus === "partial" ? "badge-warning" : "badge-neutral"
                  }`}>
                    {item.coverageStatus === "covered" ? "✓ Covered" :
                     item.coverageStatus === "uncovered" ? "⚠ Uncovered" :
                     item.coverageStatus === "partial" ? "○ Partial" : "? Unknown"}
                  </div>
                </div>
                <h3 className="text-lg font-bold truncate mb-1" title={item.name}>{item.name}</h3>
                {item.brand && (
                  <p className="text-sm text-[var(--muted-foreground)] truncate">
                    {item.brand} {item.model ? `- ${item.model}` : ""}
                  </p>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <div className="text-xs text-[var(--muted-foreground)] mb-1">Estimated Value</div>
                    <div className="text-xl font-bold">{formatCurrency(item.estimatedValue)}</div>
                  </div>
                  {item.room && (
                    <div className="text-right">
                      <div className="text-xs text-[var(--muted-foreground)] mb-1">Location</div>
                      <div className="text-sm font-medium">{item.room}</div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center text-sm pt-4 border-t border-[var(--border)]">
                  <span className="text-[var(--muted-foreground)]">
                    {item.purchaseDate ? `Bought ${formatDate(item.purchaseDate)}` : `Condition: ${item.condition}`}
                  </span>
                  <Link 
                    href={`/inventory/${item.id}`}
                    className="text-[var(--primary)] hover:text-[var(--accent)] font-medium transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
