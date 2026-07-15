"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { getInitials } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/inventory", label: "Inventory" },
  { href: "/policies", label: "Policies" },
  { href: "/coverage", label: "Coverage" },
  { href: "/claims", label: "Claims" },
  { href: "/advisor", label: "AI Advisor" },
];

export function IslandNav({ userName, userEmail }: { userName: string; userEmail: string }) {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="pointer-events-auto bg-[var(--card)]/30 backdrop-blur-2xl border border-[var(--border)] shadow-[0_8px_30px_rgba(0,0,0,0.4)] rounded-full px-2 py-2 flex items-center gap-1 overflow-x-auto max-w-full no-scrollbar"
        >
          <div className="mr-4 ml-3 hidden sm:flex items-center gap-2">
            <span className="text-xl">🛡️</span>
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors hover:text-white z-10 whitespace-nowrap"
              >
                {isActive && (
                  <motion.div
                    layoutId="island-active-pill"
                    className="absolute inset-0 bg-[var(--primary)]/20 border border-[var(--primary)]/40 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={isActive ? "text-[var(--primary)]" : "text-[var(--muted-foreground)] group-hover:text-white"}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </motion.nav>
      </div>

      <div className="fixed top-6 right-4 sm:right-8 z-50">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 sm:gap-3 bg-[var(--card)]/30 backdrop-blur-2xl border border-[var(--border)] hover:border-[var(--primary)]/50 transition-colors p-1.5 pr-3 sm:pr-4 rounded-full shadow-lg"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {getInitials(userName)}
            </div>
            <span className="hidden sm:block text-sm font-medium text-white max-w-[120px] truncate">{userName}</span>
            <ChevronDown className={`hidden sm:block w-4 h-4 text-[var(--muted-foreground)] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-3 w-64 bg-[var(--card)]/60 backdrop-blur-xl border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden py-1"
              >
                <div className="px-4 py-4 border-b border-[var(--border)]">
                  <p className="text-sm font-medium text-white truncate">{userName}</p>
                  <p className="text-xs text-[var(--muted-foreground)] truncate mt-1">{userEmail}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-[var(--destructive)] hover:bg-[var(--destructive)]/10 transition-colors flex items-center gap-3 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
