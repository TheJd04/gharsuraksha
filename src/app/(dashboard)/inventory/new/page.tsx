"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ITEM_CONDITIONS, ROOMS } from "@/lib/utils";
import type { Category } from "@prisma/client";

export default function NewItemPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    brand: "",
    model: "",
    estimatedValue: "",
    room: "",
    condition: "good",
    notes: "",
    purchaseDate: "",
  });

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
      })
      .catch(console.error);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setError("Image must be smaller than 4MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      processImageWithAI(base64);
    };
    reader.readAsDataURL(file);
  };

  const processImageWithAI = async (imageBase64: string) => {
    setAiProcessing(true);
    setError("");

    try {
      const res = await fetch("/api/ai/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64 }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to process image");

      const { result } = data;
      
      setFormData((prev) => ({
        ...prev,
        name: result.name || prev.name,
        categoryId: result.categoryId || prev.categoryId,
        brand: result.brand || prev.brand,
        model: result.model || prev.model,
        estimatedValue: result.estimatedValue ? result.estimatedValue.toString() : prev.estimatedValue,
        condition: result.condition || prev.condition,
        notes: result.description ? `AI Description: ${result.description}\n\n${prev.notes}` : prev.notes,
      }));
    } catch (err: any) {
      setError(err.message || "Failed to process image with AI. Please enter details manually.");
    } finally {
      setAiProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        estimatedValue: parseFloat(formData.estimatedValue) || 0,
        photoUrl: imagePreview, // In a real app, upload this to S3/Cloudinary first
      };

      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create item");

      router.push("/inventory");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto fade-in pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/inventory" className="p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors">
          ←
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add New Item</h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            Upload a photo to auto-fill details, or enter them manually.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Photo & AI */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>📸</span> AI Cataloging
            </h2>
            
            <div 
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                imagePreview ? "border-[var(--primary)] bg-[var(--primary)]/5" : "border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-[var(--secondary)]"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                capture="environment"
                className="hidden" 
              />
              
              {imagePreview ? (
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                  {aiProcessing && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm">
                      <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-2"></div>
                      <span className="text-white text-sm font-medium">Analyzing...</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8">
                  <div className="text-4xl mb-3">📷</div>
                  <p className="text-sm font-medium text-[var(--foreground)] mb-1">Click to upload photo</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Gemini AI will extract details instantly</p>
                </div>
              )}
            </div>

            {aiProcessing && (
              <div className="mt-4 p-3 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-sm text-[var(--primary)] flex items-center gap-2">
                <span className="animate-pulse">✨</span> AI is estimating value and categorizing...
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="glass-card p-6 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="label">Item Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field text-lg font-medium"
                  placeholder="e.g. Samsung 55-inch Smart TV"
                  required
                />
              </div>

              <div>
                <label className="label">Category *</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="select-field"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Estimated Value (₹) *</label>
                <input
                  name="estimatedValue"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.estimatedValue}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <label className="label">Brand (Optional)</label>
                <input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. Samsung"
                />
              </div>

              <div>
                <label className="label">Model (Optional)</label>
                <input
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. QN55Q60A"
                />
              </div>

              <div>
                <label className="label">Room / Location</label>
                <select
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  className="select-field"
                >
                  <option value="">Select a room</option>
                  {ROOMS.map((room) => (
                    <option key={room} value={room}>{room}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="select-field"
                >
                  {ITEM_CONDITIONS.map((cond) => (
                    <option key={cond.value} value={cond.value}>{cond.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Purchase Date (Optional)</label>
                <input
                  name="purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="label">Notes / Details</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="textarea-field"
                placeholder="Any additional details, serial numbers, etc."
                rows={4}
              />
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex justify-end gap-4">
              <Link href="/inventory" className="btn-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading || aiProcessing}
                className="btn-primary min-w-[150px]"
              >
                {loading ? "Saving..." : "Save Item"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
