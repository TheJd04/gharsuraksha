"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import CountUp from "react-countup";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-white">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -68 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 border-b border-[var(--primary)]/20 bg-[var(--background)]/90 backdrop-blur-md h-[68px]"
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-[17px] tracking-wide text-white">GHARSURAKSHA</span>
          </div>
          <div className="hidden md:flex items-center gap-6 font-sans text-sm text-[var(--secondary-foreground)]">
            <Link href="#modules" className="hover:text-white transition-colors">Modules</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">Process</Link>
            <Link href="#security" className="hover:text-white transition-colors">Security</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-sans text-[var(--secondary-foreground)] hover:text-white transition-colors">Sign In</Link>
            <Link href="/register" className="bg-[var(--primary)] text-white font-sans text-sm px-6 py-2.5 rounded hover:scale-105 transition-transform duration-150">
              Get Started
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden bg-[var(--background)] flex items-center">
        {/* Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none w-full text-center overflow-hidden">
          <span className="font-heading font-extrabold text-[clamp(80px,20vw,360px)] leading-none text-white opacity-[0.02] whitespace-nowrap tracking-tighter block">
            GHARSURAKSHA
          </span>
        </div>

        {/* Content Panel */}
        <div className="relative z-10 flex flex-col justify-center pl-[clamp(24px,6vw,96px)] w-full md:w-[70%]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            <div className="font-sans font-light text-[13px] tracking-[0.14em] uppercase text-[var(--primary)] mb-6">
              AI-POWERED INSURANCE INTELLIGENCE
            </div>
            <h1 className="font-heading font-extrabold text-[clamp(45px,7vw,120px)] leading-[1.05] text-white tracking-tight">
              KNOW YOUR ASSETS.<br />
              <span className="text-[var(--primary)]">PROTECT YOUR HOME.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="font-sans font-normal text-[18px] text-[var(--secondary-foreground)] mt-6 max-w-[500px] leading-[1.6]"
          >
            Award-winning home inventory platform for India. Over 400+ items recognized. Stop guessing your coverage gaps and stay prepared.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <Link href="/register" className="bg-[var(--primary)] text-white font-sans text-[15px] px-7 py-3.5 rounded hover:scale-[1.03] transition-transform duration-150 inline-flex justify-center items-center font-medium">
              Start Free Inventory
            </Link>
            <Link href="#modules" className="bg-transparent border border-white/30 text-white font-sans text-[15px] px-7 py-3.5 rounded hover:bg-white/5 transition-colors duration-150 inline-flex justify-center items-center gap-2 group">
              <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full group-hover:animate-ping"></span>
              See How It Works →
            </Link>
          </motion.div>

          {/* Count-Up Stats Row */}
          <div className="flex flex-wrap gap-x-12 gap-y-8 mt-16 lg:mt-20">
            {[
              { value: 400, suffix: "+", label: "Pre-loaded Items" },
              { value: 15, suffix: "", label: "Categories" },
              { value: 100, suffix: "%", label: "AI Powered" },
              { value: 0, prefix: "₹", label: "To Get Started" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <div className="font-heading font-bold text-[48px] lg:text-[56px] text-[var(--primary)] leading-none">
                  {stat.prefix}<CountUp end={stat.value} duration={2} enableScrollSpy scrollSpyOnce />{stat.suffix}
                </div>
                <div className="font-sans font-light text-[13px] text-[var(--secondary-foreground)] tracking-[0.06em] uppercase mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / Features Row */}
      <section id="modules" className="bg-[var(--background)] py-24 px-[clamp(24px,6vw,96px)] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="font-sans font-light text-[12px] tracking-[0.14em] uppercase text-[var(--primary)] mb-8">
            CORE MODULES
          </div>
          <h2 className="font-heading font-bold text-[clamp(32px,4vw,60px)] text-white mb-12 leading-tight">
            Everything You Need to <br />Protect Your Home.
          </h2>

          <div className="flex flex-col border-t border-white/10">
            {[
              { name: "AI Photo Cataloging", desc: "Snap a photo of any item. Gemini Vision AI identifies it, estimates value, and adds it to your inventory automatically.", meta: "Instant" },
              { name: "Policy Intelligence", desc: "Upload your insurance policies. AI parses coverage details, limits, deductibles, and exclusions into a clear dashboard.", meta: "Automated" },
              { name: "Coverage Gap Analyzer", desc: "Cross-references your inventory against your policies. See exactly what's covered, what's not, and what's under-insured.", meta: "Intelligent" },
              { name: "Claims Generator", desc: "After a loss event, select affected items and generate a professional, structured claim report instantly.", meta: "Stress-Free" },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-white/10 cursor-pointer hover:border-l-[3px] hover:border-l-[var(--primary)] hover:pl-5 hover:shadow-[0_4px_20px_rgba(217,119,6,0.15)] transition-all duration-200 ease-out bg-[var(--background)]"
              >
                <div className="md:w-2/3">
                  <h3 className="font-heading font-bold text-[22px] text-white group-hover:text-[var(--primary)] transition-colors">
                    {service.name}
                  </h3>
                  <p className="font-sans text-[15px] text-[#8a7f76] mt-2">
                    {service.desc}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <span className="font-sans font-light text-[14px] text-[var(--secondary-foreground)]">{service.meta}</span>
                  <span className="text-[24px] text-[var(--primary)] group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Strip */}
      <div className="w-full bg-[var(--primary)] py-6 px-[clamp(24px,6vw,96px)] flex flex-wrap justify-center items-center gap-x-8 lg:gap-x-12 gap-y-4">
        {["Bank-Grade Encryption", "Gemini AI Powered", "India specific catalog", "100% Privacy", "Export Anywhere"].map((badge, i) => (
          <div key={i} className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-white" />
            <span className="font-sans font-light text-[14px] text-white tracking-[0.04em]">{badge}</span>
            {i !== 4 && <div className="hidden md:block w-px h-4 bg-white/30 ml-8 lg:ml-12" />}
          </div>
        ))}
      </div>

      {/* Process Section */}
      <section id="how-it-works" className="bg-[var(--card)] py-24 px-[clamp(24px,6vw,96px)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-[clamp(32px,4vw,56px)] text-white mb-20 text-center">
            HOW IT WORKS
          </h2>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="hidden md:block absolute top-[40px] left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50" />

            {[
              { num: "01", stepLabel: "FIRST STEP", title: "Build Inventory", desc: "Use our interface to log items. The AI automatically categorizes and values them for you." },
              { num: "02", stepLabel: "SECOND STEP", title: "Upload Policies", desc: "Drop your insurance PDFs into the platform. We read the fine print so you don't have to." },
              { num: "03", stepLabel: "THIRD STEP", title: "Stay Protected", desc: "Get instant gap analysis. Know exactly what you need to upgrade before a disaster strikes." },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.18 }}
                className="relative flex flex-col items-center text-center z-10"
              >
                <div className="font-heading font-extrabold text-[80px] text-[var(--primary)] opacity-10 mb-[-16px] leading-none select-none">
                  {idx + 1}
                </div>
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center font-sans text-[16px] text-white shadow-[0_0_15px_rgba(217,119,6,0.4)]">
                  {step.num}
                </div>
                <div className="font-sans font-light text-[13px] tracking-[0.1em] uppercase text-[var(--primary)] mt-6">
                  {step.stepLabel}
                </div>
                <h3 className="font-heading font-bold text-[20px] text-white mt-2">
                  {step.title}
                </h3>
                <p className="font-sans text-[15px] text-[#8a7f76] leading-[1.6] mt-3 max-w-sm">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section (Replaces Emergency) */}
      <section id="security" className="bg-[var(--background)] py-24 px-[clamp(24px,6vw,96px)] border-t-[2px] border-[#e53e3e]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <div className="inline-block bg-[#e53e3e] font-sans font-light text-[12px] text-white tracking-[0.14em] uppercase px-3 py-1 rounded-sm mb-5">
              YOUR DATA IS SECURE
            </div>
            <h2 className="font-heading font-bold text-[clamp(32px,4.5vw,60px)] text-white leading-tight">
              BANK-GRADE SECURITY. <br />COMPLETE PRIVACY.
            </h2>
            <p className="font-sans text-[17px] text-[#8a7f76] mt-6 leading-[1.7] max-w-[580px]">
              We understand that your home inventory is sensitive data. We encrypt all your photos and policy documents. Your data is yours, and we never share it with insurance providers without your explicit consent.
            </p>
            <div className="font-heading font-extrabold text-[clamp(28px,4vw,50px)] text-white mt-8 opacity-90">
              100% PRIVATE.
            </div>
          </div>
          <div className="flex-1 w-full bg-gradient-to-tr from-[var(--muted)] to-[var(--card)] p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden h-[300px] flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-32 bg-[var(--primary)]/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="relative z-10 font-mono text-sm text-[var(--primary)] opacity-70 mb-4">{"// Encryption handshake established"}</div>
            <div className="relative z-10 flex flex-col gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-10 bg-black/40 rounded flex items-center px-4 overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary)] opacity-80" />
                  <div className="font-mono text-xs text-white/50 tracking-wider">enc_block_v{i}_x{i * 7}ksf... encrypted</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--primary)] py-24 px-[clamp(24px,6vw,96px)] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="font-heading font-extrabold text-[clamp(40px,6vw,96px)] text-white leading-none">
            START YOUR FREE INVENTORY
          </h2>
          <p className="font-sans text-[17px] text-white/90 mt-6 max-w-2xl mx-auto">
            No credit card required. Be among the smart 10% of homeowners who are prepared for the unexpected.
          </p>
          <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.2 }} className="inline-block mt-10">
            <Link href="/register" className="bg-white text-[var(--primary)] font-heading font-bold text-[16px] px-10 py-5 rounded hover:bg-[var(--background)] hover:text-white transition-colors duration-300">
              Book Free Survey
            </Link>
          </motion.div>
          <div className="font-sans font-light text-[13px] text-white/70 mt-6 tracking-wide">
            Free forever for up to 50 items · Full AI Support
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080c12] border-t border-white/10 py-12 px-[clamp(24px,6vw,96px)] pb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col">
            <div className="font-heading font-bold text-[17px] text-white tracking-wide">GHARSURAKSHA</div>
            <div className="font-sans font-light text-[14px] text-[#6a7a94] mt-1">Smart Home Inventory</div>
          </div>
          <div className="flex gap-6 font-sans font-light text-[14px] text-[#6a7a94]">
            <Link href="#modules" className="hover:text-white transition-colors">Modules</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">Process</Link>
            <Link href="#security" className="hover:text-white transition-colors">Security</Link>
          </div>
          <div className="font-sans font-light text-[12px] text-[#4a5568]">
            © {new Date().getFullYear()} GharSuraksha. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
