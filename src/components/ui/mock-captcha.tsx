"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface MockCaptchaProps {
  onVerify: (isValid: boolean) => void;
}

export function MockCaptcha({ onVerify }: MockCaptchaProps) {
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const options = [
    { id: "house", icon: "🏠", label: "House" },
    { id: "car", icon: "🚗", label: "Car" },
    { id: "shield", icon: "🛡️", label: "Shield" },
    { id: "phone", icon: "📱", label: "Phone" },
  ];

  // Randomize the target to look somewhat legitimate, but hardcode the win condition for the demo.
  const targetId = "shield";
  const targetIcon = "🛡️";

  const handleSelect = (id: string) => {
    if (status === "success") return;
    
    if (id === targetId) {
      setStatus("success");
      onVerify(true);
    } else {
      setStatus("error");
      onVerify(false);
      // Reset error after 2 seconds
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 w-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-[var(--primary)] text-white p-1 rounded-sm">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--foreground)]">Security Verification</p>
          <p className="text-xs text-[var(--muted-foreground)]">
            Please click on the <strong>{targetIcon} (Shield)</strong>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => handleSelect(opt.id)}
            className={`
              aspect-square rounded-md text-2xl flex items-center justify-center
              border transition-all duration-200
              ${status === "success" && opt.id === targetId 
                ? "bg-green-500/20 border-green-500/50 scale-105" 
                : "bg-[var(--background)] border-[var(--border)] hover:bg-[var(--muted)] hover:border-[var(--primary)]"}
              ${status === "error" && opt.id !== targetId ? "opacity-50" : ""}
            `}
          >
            <motion.span 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {opt.icon}
            </motion.span>
          </button>
        ))}
      </div>

      {status === "success" && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-green-500 text-xs font-medium mt-3 flex items-center gap-1"
        >
          <CheckCircle2 className="w-3 h-3" /> Verification successful
        </motion.p>
      )}

      {status === "error" && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-red-400 text-xs font-medium mt-3 flex items-center gap-1"
        >
          <XCircle className="w-3 h-3" /> Incorrect selection. Try again.
        </motion.p>
      )}
    </div>
  );
}
