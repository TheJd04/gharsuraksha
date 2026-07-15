"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="print-hidden flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] hover:bg-[var(--border)] border border-[var(--border)] rounded-lg text-sm font-medium transition-colors"
      title="Print this page"
    >
      <Printer className="w-4 h-4" />
      <span>Print Report</span>
    </button>
  );
}
