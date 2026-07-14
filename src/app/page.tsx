import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span className="text-xl font-bold gradient-text">GharSuraksha</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="btn-secondary text-sm">Log In</Link>
            <Link href="/register" className="btn-primary text-sm">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--secondary)] text-sm text-[var(--muted-foreground)] mb-8 fade-in">
            <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse"></span>
            AI-Powered Insurance Intelligence for India
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 fade-in">
            Know What You <span className="gradient-text">Own</span>.
            <br />
            Know What&apos;s <span className="gradient-text">Covered</span>.
          </h1>

          <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-10 fade-in">
            Snap photos of your belongings. AI catalogs and values them.
            Upload your insurance policies. We find the gaps, traps, and loopholes —
            so you&apos;re never caught off guard.
          </p>

          <div className="flex items-center justify-center gap-4 mb-16 fade-in">
            <Link href="/register" className="btn-primary text-base px-8 py-3">
              Start Free Inventory →
            </Link>
            <Link href="/login" className="btn-secondary text-base px-8 py-3">
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: "400+", label: "Pre-loaded Items", icon: "📦" },
              { value: "15", label: "Item Categories", icon: "📁" },
              { value: "AI", label: "Vision Cataloging", icon: "🤖" },
              { value: "₹0", label: "To Get Started", icon: "💰" },
            ].map((stat) => (
              <div key={stat.label} className="stat-card text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-[var(--muted-foreground)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Everything You Need to <span className="gradient-text">Protect Your Home</span>
          </h2>
          <p className="text-center text-[var(--muted-foreground)] mb-12 max-w-2xl mx-auto">
            Five powerful modules working together to give you complete visibility into your assets and insurance coverage.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "📸",
                title: "AI Photo Cataloging",
                desc: "Snap a photo of any item. Gemini Vision AI identifies it, estimates value, and adds it to your inventory automatically.",
                color: "from-indigo-500/20 to-purple-500/20",
              },
              {
                icon: "📋",
                title: "Policy Intelligence",
                desc: "Upload your insurance policies. AI parses coverage details, limits, deductibles, and exclusions into a clear dashboard.",
                color: "from-blue-500/20 to-cyan-500/20",
              },
              {
                icon: "🔍",
                title: "Coverage Gap Analyzer",
                desc: "Cross-references your inventory against your policies. See exactly what's covered, what's not, and what's under-insured.",
                color: "from-emerald-500/20 to-green-500/20",
              },
              {
                icon: "📄",
                title: "Claims Generator",
                desc: "After a loss event, select affected items and generate a professional, structured claim report instantly.",
                color: "from-amber-500/20 to-orange-500/20",
              },
              {
                icon: "🤖",
                title: "AI Insurance Advisor",
                desc: "Chat with our AI advisor that knows your inventory and policies. Find loopholes, traps, and get coverage recommendations.",
                color: "from-rose-500/20 to-pink-500/20",
              },
              {
                icon: "🇮🇳",
                title: "Made for India",
                desc: "Pre-loaded with 400+ common Indian household items — from pressure cookers to almirahs to mangalsutras, all with Hindi names.",
                color: "from-violet-500/20 to-fuchsia-500/20",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="glass-card p-6 group cursor-default"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It <span className="gradient-text">Works</span>
          </h2>

          <div className="space-y-8">
            {[
              { step: "1", title: "Build Your Inventory", desc: "Add items from our 400+ item catalog or snap photos. AI identifies and values everything." },
              { step: "2", title: "Add Your Policies", desc: "Upload insurance policy documents or enter details manually. AI extracts all coverage information." },
              { step: "3", title: "See Your Gaps", desc: "Our gap analyzer cross-references inventory vs policies and shows exactly what's at risk." },
              { step: "4", title: "Stay Protected", desc: "Generate claims reports, chat with AI advisor, and get recommendations to close coverage gaps." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-[var(--muted-foreground)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don&apos;t Wait for a <span className="gradient-text">Loss to Realize</span> What You Had
          </h2>
          <p className="text-[var(--muted-foreground)] mb-8">
            90% of Indian households have no inventory. Be among the 10% who are prepared.
          </p>
          <Link href="/register" className="btn-primary text-base px-10 py-3">
            Create Your Free Inventory →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🛡️</span>
            <span className="font-semibold gradient-text">GharSuraksha</span>
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">
            Built with Next.js 16, Tailwind CSS, PostgreSQL & Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
}
