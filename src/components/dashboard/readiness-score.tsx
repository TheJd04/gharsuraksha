"use client";

import { motion } from "framer-motion";

interface ReadinessScoreProps {
  score: number; // 0 to 100
}

export function ReadinessScore({ score }: ReadinessScoreProps) {
  const circumference = 2 * Math.PI * 40; // r=40
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let color = "var(--destructive)";
  if (score >= 80) color = "var(--success)";
  else if (score >= 50) color = "var(--warning)";

  return (
    <div className="glass-panel p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group h-full">
      {/* Background glow */}
      <div 
        className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)` }}
      />
      
      <h2 className="text-lg font-semibold mb-2 relative z-10 text-white">Financial Readiness Score</h2>
      
      <div className="relative w-32 h-32 flex items-center justify-center my-4 z-10">
        <svg className="w-full h-full transform -rotate-90 drop-shadow-lg" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="var(--border)"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{score}</span>
        </div>
      </div>
      
      <p className="text-sm font-medium text-[var(--muted-foreground)] relative z-10 px-2">
        {score >= 80 ? "Great job! Your assets are well protected." : score >= 50 ? "You're getting there. Look for coverage gaps to improve." : "High risk. Add policies to protect your assets."}
      </p>
    </div>
  );
}
