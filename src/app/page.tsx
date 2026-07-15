"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import CountUp from "react-countup";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#221611] font-sans text-[#f5f5f5] selection:bg-[#c87a32] selection:text-white">
      {/* 1. Navbar */}
      <motion.nav
        initial={{ y: -68 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 w-full z-50 bg-[#221611] border-b border-[rgba(200,122,50,0.2)] h-[68px] flex items-center justify-between px-6"
      >
        <div className="font-heading font-bold text-[17px] text-[#f5f5f5]">
          Summit Roofing
        </div>
        <div className="hidden md:flex items-center gap-6 font-sans font-normal text-[14px] text-[#d1bba8]">
          <Link href="#services" className="hover:text-white transition-colors">Services</Link>
          <Link href="#materials" className="hover:text-white transition-colors">Materials</Link>
          <Link href="#emergency" className="hover:text-white transition-colors">Emergency</Link>
          <Link href="#about" className="hover:text-white transition-colors">About</Link>
          <Link href="#quote" className="hover:text-white transition-colors">Quote</Link>
        </div>
        <div>
          <Link href="#quote" className="bg-[#c87a32] text-white font-sans font-normal text-[14px] px-6 py-2.5 rounded-[4px] hover:scale-[1.03] transition-transform duration-150 inline-block">
            Get a Free Quote
          </Link>
        </div>
      </motion.nav>

      {/* 2. Hero */}
      <section className="relative min-h-[100vh] w-full overflow-hidden bg-[#221611]">
        {/* Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=2500" 
          alt="Aerial view of premium slate roof installation on London terraced house" 
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
        />
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 z-[1]" 
          style={{ background: 'linear-gradient(to right, rgba(34,22,17,0.93) 0%, rgba(34,22,17,0.72) 55%, transparent 100%)' }}
        ></div>

        {/* Background text "SUMMIT" */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 font-heading font-extrabold text-[clamp(220px,32vw,480px)] text-[#f5f5f5] opacity-[0.03] pointer-events-none select-none"
        >
          SUMMIT
        </div>

        {/* Content panel */}
        <div className="absolute left-0 top-0 h-full w-full md:w-[54%] z-10 pl-[clamp(24px,6vw,96px)] flex flex-col justify-center">
          <div className="font-sans font-light text-[13px] tracking-[0.14em] uppercase text-[#d4a37a] mb-4">
            AWARD-WINNING ROOFING CONTRACTORS
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-heading font-extrabold text-[clamp(50px,7vw,128px)] leading-[1.0] text-[#f5f5f5]"
          >
            YOUR HOME.<br />
            PROTECTED.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="font-sans font-normal text-[18px] text-[#d1bba8] mt-[20px] max-w-[460px] leading-[1.6]"
          >
            Award-winning roofing contractors for London and the South East. 500+ roofs completed. 15-year workmanship guarantee.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-[12px] mt-[32px]"
          >
            <Link href="#quote" className="bg-[#c87a32] text-white font-sans font-normal text-[15px] px-[28px] py-[14px] rounded-[4px] text-center inline-block">
              Get a Free Quote
            </Link>
            <Link href="#emergency" className="bg-transparent border border-[rgba(255,255,255,0.4)] text-[#f5f5f5] font-sans font-normal text-[15px] px-[28px] py-[14px] rounded-[4px] text-center inline-flex items-center justify-center gap-[8px]">
              <span className="w-[6px] h-[6px] bg-[#e53e3e] rounded-full"></span>
              Emergency Roofing →
            </Link>
          </motion.div>

          {/* Count-up stats */}
          <div className="flex flex-row flex-wrap gap-[48px] mt-[48px]">
            {[
              { value: 500, suffix: "+", label: "Roofs Completed" },
              { value: 15, suffix: "yr", label: "Guarantee" },
              { value: 48, suffix: "hr", label: "Emergency" },
              { value: 4.9, suffix: "★", label: "Google Rating", decimals: 1 }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <div className="font-heading font-bold text-[56px] text-[#c87a32] leading-[1]">
                  <CountUp end={stat.value} decimals={stat.decimals || 0} duration={2} enableScrollSpy scrollSpyOnce />{stat.suffix}
                </div>
                <div className="font-sans font-light text-[13px] text-[#d4a37a] tracking-[0.06em] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Services */}
      <section id="services" className="bg-[#221611] py-[80px] px-[clamp(24px,6vw,96px)]">
        <div className="font-sans font-light text-[12px] tracking-[0.14em] uppercase text-[#c87a32] mb-[48px]">
          OUR SERVICES
        </div>
        <h2 className="font-heading font-bold text-[clamp(32px,4vw,60px)] text-[#f5f5f5] mb-0">
          ROOFING SERVICES
        </h2>

        <div className="mt-8 flex flex-col">
          {[
            { name: "New Roof Installation", desc: "Full new roof installation from groundwork to ridge tiles. All materials, felt, battens, and tiles included.", price: "from £3,500" },
            { name: "Re-Roofing & Replacement", desc: "Strip and re-lay on existing structure. New breathable felt, treated battens, and tiles to match or upgrade.", price: "from £2,800" },
            { name: "Repairs & Maintenance", desc: "Broken tiles, ridge issues, valleys, chimney lead flashings, and pointing. Same-week availability.", price: "from £150" },
            { name: "Guttering & Drainage", desc: "Full replacement, cleaning, and repair. UPVC, cast iron, and aluminium. Includes downpipes and brackets.", price: "from £400" },
          ].map((srv, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col md:flex-row justify-between md:items-center cursor-pointer border-t-[0.5px] border-[rgba(255,255,255,0.1)] py-[32px] hover:border-l-[3px] hover:border-l-[#c87a32] hover:pl-[16px] hover:shadow-[0_4px_20px_rgba(200,122,50,0.25)] transition-all duration-150 group"
            >
              <div className="md:w-2/3">
                <h3 className="font-heading font-bold text-[22px] text-[#f5f5f5]">{srv.name}</h3>
                <p className="font-sans font-normal text-[15px] text-[#a89483] mt-[6px]">{srv.desc}</p>
              </div>
              <div className="flex items-center gap-[16px] mt-4 md:mt-0">
                <span className="font-sans font-light text-[14px] text-[#d4a37a]">{srv.price}</span>
                <span className="text-[#c87a32] text-[24px]">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Material Cards */}
      <section id="materials" className="bg-[#2d1f17] py-[80px] px-[clamp(24px,6vw,96px)]">
        <h2 className="font-heading font-bold text-[clamp(32px,4vw,60px)] text-[#f5f5f5] mb-[48px]">
          ROOFING MATERIALS
        </h2>
        
        <div className="flex flex-col md:flex-row gap-[24px]">
          {[
            { img: "https://images.unsplash.com/photo-1628102491629-77858ab5721d?auto=format&fit=crop&q=80&w=800", name: "Concrete & Clay Tiles", desc: "The most popular choice. 50yr lifespan. Available in 40+ colours.", life: "25–50 year lifespan" },
            { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800", name: "GRP Flat Roofing", desc: "Seamless fibreglass. Ideal for extensions, garages, and bay windows. 25-year guarantee.", life: "25-year guarantee" },
            { img: "https://images.unsplash.com/photo-1512803274291-a67b5fbe776d?auto=format&fit=crop&q=80&w=800", name: "Welsh Slate", desc: "Natural Welsh slate. 100yr+ lifespan. The premium choice for period and prestige properties.", life: "100yr+ lifespan" }
          ].map((mat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 40px rgba(200,122,50,0.3)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[8px] cursor-pointer flex-1 group"
            >
              <img src={mat.img} alt={mat.name} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', objectPosition: 'center' }} />
              <div style={{ background: 'linear-gradient(to top, rgba(34,22,17,0.92) 0%, transparent 60%)' }} className="absolute inset-0"></div>
              <div className="absolute bottom-0 p-[24px] z-10 w-full">
                <h3 className="font-heading font-bold text-[22px] text-[#f5f5f5]">{mat.name}</h3>
                <p className="font-sans font-light text-[14px] text-[#a89483] mt-1">{mat.desc}</p>
                <div className="font-sans font-light text-[13px] text-[#c87a32] mt-[8px]">
                  {mat.life}
                </div>
                <button className="bg-[#c87a32] text-white font-sans font-normal text-[13px] px-[16px] py-[8px] rounded-[4px] mt-[12px]">
                  Book a Survey
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Trust Badges Strip */}
      <div className="w-full bg-[#c87a32] py-[24px] px-[clamp(24px,6vw,96px)] flex flex-wrap justify-center items-center gap-x-[48px] gap-y-[16px]">
        {["NFRC Member", "TrustMark Approved", "Which? Trusted Trader", "15yr Guarantee", "All Work Insured", "500+ Roofs"].map((badge, i) => (
          <div key={i} className="flex items-center gap-[8px]">
            <CheckCircle className="w-[16px] h-[16px] text-white" />
            <span className="font-sans font-light text-[14px] text-white tracking-[0.04em]">{badge}</span>
            {i !== 5 && <div className="hidden lg:block w-px h-[16px] border-l border-[rgba(255,255,255,0.3)] ml-[48px]" />}
          </div>
        ))}
      </div>

      {/* 6. Quote Process */}
      <section className="bg-[#221611] py-[80px] px-[clamp(24px,6vw,96px)] relative">
        <h2 className="font-heading font-bold text-[clamp(32px,4vw,56px)] text-[#f5f5f5] mb-[60px] text-center md:text-left">
          HOW IT WORKS
        </h2>

        <div className="relative flex flex-col md:flex-row gap-0">
          <div className="hidden md:block absolute top-[40px] left-[16.6%] right-[16.6%] h-[1px]" style={{ background: 'linear-gradient(to right, transparent, #c87a32, transparent)' }}></div>

          {[
            { num: "1", badge: "01", label: "FIRST STEP", title: "Free Survey", desc: "We visit your property, inspect the roof from ground and access point, and give you an honest assessment." },
            { num: "2", badge: "02", label: "SECOND STEP", title: "Written Quote (24hrs)", desc: "You'll have a full written quote with materials, timeline, and total cost within 24 hours of the survey." },
            { num: "3", badge: "03", label: "THIRD STEP", title: "Work Starts Within 2 Weeks", desc: "Our crew arrives on the agreed date. Fully insured, NFRC registered, and tidy throughout." }
          ].map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.18, ease: "easeOut" }}
              className="flex-1 flex flex-col items-center text-center p-[24px]"
            >
              <div className="font-heading font-extrabold text-[80px] text-[#c87a32] opacity-10 mb-[-16px] leading-[1]">
                {step.num}
              </div>
              <div className="w-[40px] h-[40px] bg-[#c87a32] rounded-full font-sans font-normal text-[16px] text-white flex items-center justify-center z-10">
                {step.badge}
              </div>
              <div className="font-sans font-light text-[13px] tracking-[0.1em] uppercase text-[#d4a37a] mt-[16px]">
                {step.label}
              </div>
              <h3 className="font-heading font-bold text-[20px] text-[#f5f5f5] mt-[8px]">
                {step.title}
              </h3>
              <p className="font-sans font-normal text-[15px] text-[#a89483] leading-[1.6] mt-3">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. Emergency Section */}
      <section id="emergency" className="bg-[#221611] py-[80px] px-[clamp(24px,6vw,96px)] border-t-[2px] border-[#e53e3e]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-block bg-[#e53e3e] font-sans font-light text-[12px] text-white tracking-[0.14em] uppercase px-[12px] py-[4px] rounded-[2px] mb-[20px]">
            48HR EMERGENCY RESPONSE
          </div>
          
          <h2 className="font-heading font-bold text-[clamp(32px,4.5vw,72px)] text-[#f5f5f5] leading-tight">
            EMERGENCY ROOFING — <br className="hidden md:block"/>48hr RESPONSE
          </h2>
          
          <p className="font-sans font-normal text-[17px] text-[#a89483] mt-[16px] max-w-[580px] leading-[1.7]">
            Storm damage? Leak? Active water ingress? We know it can't wait. Call us now and we'll have a roofer with you within 48 hours — usually sooner.
          </p>

          <div className="font-heading font-extrabold text-[clamp(36px,5vw,80px)] text-[#f5f5f5] mt-[32px] leading-none">
            0800 123 4567
          </div>
          <div className="font-sans font-light text-[14px] text-[#d4a37a] mt-2">
            Free to call · 8am–8pm Mon–Sat
          </div>

          <motion.button 
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-[#c87a32] text-white font-sans font-normal text-[15px] px-[32px] py-[16px] rounded-[4px] mt-[24px]"
          >
            Get Emergency Help
          </motion.button>

          <img 
            src="https://images.unsplash.com/photo-1589139500057-a4bc9f1c7d24?auto=format&fit=crop&q=80&w=1600" 
            alt="Storm damage to residential roof requiring emergency repair" 
            style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', objectPosition: 'center', marginTop: '48px', borderRadius: '8px' }} 
          />
        </motion.div>
      </section>

      {/* 8. Testimonial */}
      <section className="bg-[#2d1f17] py-[80px] px-[clamp(24px,6vw,96px)] text-center md:text-left flex flex-col items-center md:items-start">
        <div className="text-[#c87a32] text-[20px] mb-[24px] tracking-[4px]">
          ★★★★★
        </div>
        <blockquote className="font-heading font-bold text-[clamp(24px,3.5vw,48px)] text-[#f5f5f5] italic leading-[1.3] max-w-4xl">
          "Summit re-roofed our Victorian terrace and the finish is exceptional. Tidy, professional, and on time."
        </blockquote>
        <div className="font-sans font-light text-[15px] text-[#d4a37a] mt-[20px]">
          — David K., Wimbledon
        </div>
      </section>

      {/* 9. Blue CTA */}
      <section id="quote" className="bg-[#c87a32] py-[80px] px-[clamp(24px,6vw,96px)] text-center">
        <h2 className="font-heading font-extrabold text-[clamp(40px,6vw,96px)] text-white leading-none">
          GET YOUR FREE SURVEY
        </h2>
        <p className="font-sans font-normal text-[17px] text-[rgba(255,255,255,0.85)] mt-[16px] max-w-2xl mx-auto">
          No obligation. Written quote within 24 hours. Work guaranteed for 15 years.
        </p>
        <button className="bg-white text-[#c87a32] font-heading font-bold text-[16px] px-[40px] py-[20px] rounded-[4px] mt-[40px] hover:bg-[#221611] hover:text-white transition-colors duration-200">
          Book Free Survey
        </button>
        <div className="font-sans font-light text-[13px] text-[rgba(255,255,255,0.7)] mt-[16px]">
          London and South East · 500+ roofs completed · NFRC registered
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-[#160d09] border-t border-[rgba(200,122,50,0.2)] py-[48px] px-[clamp(24px,6vw,96px)] pb-[32px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[40px]">
          <div>
            <div className="font-heading font-bold text-[17px] text-[#f5f5f5]">Summit Roofing</div>
            <div className="font-sans font-light text-[14px] text-[#4a5568] mt-2">Premium Roofing Contractors</div>
          </div>
          <div>
            <h4 className="font-sans font-semibold text-[15px] text-[#f5f5f5] mb-4">Services</h4>
            <div className="flex flex-col gap-2 font-sans font-light text-[14px] text-[#6a7a94]">
              <span>New Roofs</span>
              <span>Re-Roofing</span>
              <span>Repairs</span>
              <span>Guttering</span>
              <span>Emergency</span>
            </div>
          </div>
          <div>
            <h4 className="font-sans font-semibold text-[15px] text-[#f5f5f5] mb-4">Coverage</h4>
            <div className="flex flex-col gap-2 font-sans font-light text-[14px] text-[#6a7a94]">
              <span>London</span>
              <span>Surrey</span>
              <span>Kent</span>
              <span>Sussex</span>
              <span>Essex</span>
              <span>Hertfordshire</span>
            </div>
          </div>
          <div>
            <h4 className="font-sans font-semibold text-[15px] text-[#f5f5f5] mb-4">Contact</h4>
            <div className="flex flex-col gap-2 font-sans font-light text-[14px] text-[#6a7a94]">
              <span>0800 123 4567</span>
              <span>hello@summitroofing.co.uk</span>
              <span>123 Roofing House<br/>London, SW1 1AA</span>
            </div>
          </div>
        </div>
        <div className="border-t border-[rgba(255,255,255,0.1)] mt-[48px] pt-[32px] font-sans font-light text-[12px] text-[#4a5568] text-center md:text-left">
          © 2025 Summit Roofing. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
