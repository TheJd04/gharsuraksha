"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

interface TooltipEducationProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export function TooltipEducation({ term, definition, children }: TooltipEducationProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-flex items-center gap-1 group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="border-b border-dashed border-[var(--primary)]/50 cursor-help">
        {children}
      </span>
      <Info className="w-3.5 h-3.5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors" />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 rounded-xl glass-panel text-sm text-left shadow-xl pointer-events-none"
          >
            <div className="font-bold text-[var(--primary)] mb-1">{term}</div>
            <div className="text-white text-xs leading-relaxed font-medium">
              {definition}
            </div>
            {/* Little triangle arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[rgba(28,24,20,0.8)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
