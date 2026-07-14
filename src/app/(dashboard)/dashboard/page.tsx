import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  // Fetch dashboard data
  const [items, policies, claims] = await Promise.all([
    prisma.item.findMany({ where: { userId }, include: { category: true } }),
    prisma.policy.findMany({ where: { userId } }),
    prisma.claim.findMany({ where: { userId } }),
  ]);

  const totalValue = items.reduce((sum, item) => sum + item.estimatedValue, 0);
  const coveredItems = items.filter((i) => i.coverageStatus === "covered");
  const uncoveredItems = items.filter((i) => i.coverageStatus === "uncovered");
  const coveredValue = coveredItems.reduce((sum, i) => sum + i.estimatedValue, 0);
  const uncoveredValue = uncoveredItems.reduce((sum, i) => sum + i.estimatedValue, 0);
  const coveragePercent = totalValue > 0 ? Math.round((coveredValue / totalValue) * 100) : 0;

  const activePolicies = policies.filter(
    (p) => p.status === "active" && (!p.endDate || new Date(p.endDate) > new Date())
  );

  // Category breakdown
  const categoryBreakdown = items.reduce<Record<string, { count: number; value: number; icon: string }>>((acc, item) => {
    const catName = item.category.name;
    if (!acc[catName]) acc[catName] = { count: 0, value: 0, icon: item.category.icon };
    acc[catName].count++;
    acc[catName].value += item.estimatedValue;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryBreakdown)
    .sort(([, a], [, b]) => b.value - a.value)
    .slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="gradient-text">{session.user.name?.split(" ")[0]}</span>
        </h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          Here&apos;s an overview of your home inventory and insurance coverage.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <div className="text-2xl mb-2">📦</div>
          <div className="text-2xl font-bold">{items.length}</div>
          <div className="text-sm text-[var(--muted-foreground)]">Total Items</div>
        </div>
        <div className="stat-card">
          <div className="text-2xl mb-2">💰</div>
          <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
          <div className="text-sm text-[var(--muted-foreground)]">Total Value</div>
        </div>
        <div className="stat-card">
          <div className="text-2xl mb-2">📋</div>
          <div className="text-2xl font-bold">{activePolicies.length}</div>
          <div className="text-sm text-[var(--muted-foreground)]">Active Policies</div>
        </div>
        <div className="stat-card">
          <div className="text-2xl mb-2">📄</div>
          <div className="text-2xl font-bold">{claims.length}</div>
          <div className="text-sm text-[var(--muted-foreground)]">Claims Filed</div>
        </div>
      </div>

      {/* Coverage Overview */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">Coverage Overview</h2>

          {items.length === 0 ? (
            <div className="empty-state py-8">
              <p className="text-lg mb-2">No items yet</p>
              <p className="text-sm mb-4">Start by adding items to your inventory</p>
              <Link href="/inventory/new" className="btn-primary text-sm">
                Add First Item
              </Link>
            </div>
          ) : (
            <>
              {/* Coverage Meter */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--muted-foreground)]">Coverage</span>
                  <span className="font-semibold">{coveragePercent}%</span>
                </div>
                <div className="coverage-meter">
                  <div
                    className="coverage-meter-fill"
                    style={{
                      width: `${coveragePercent}%`,
                      background: coveragePercent > 70
                        ? "linear-gradient(90deg, #22c55e, #4ade80)"
                        : coveragePercent > 40
                        ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                        : "linear-gradient(90deg, #ef4444, #f87171)",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/20">
                  <div className="text-lg font-bold text-[var(--success)]">{coveredItems.length}</div>
                  <div className="text-xs text-[var(--muted-foreground)]">Covered</div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--destructive)]/10 border border-[var(--destructive)]/20">
                  <div className="text-lg font-bold text-[var(--destructive)]">{uncoveredItems.length}</div>
                  <div className="text-xs text-[var(--muted-foreground)]">Uncovered</div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--warning)]/10 border border-[var(--warning)]/20">
                  <div className="text-lg font-bold text-[var(--warning)]">{formatCurrency(uncoveredValue)}</div>
                  <div className="text-xs text-[var(--muted-foreground)]">At Risk</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Top Categories */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">Top Categories by Value</h2>

          {topCategories.length === 0 ? (
            <div className="empty-state py-8">
              <p className="text-sm">Add items to see category breakdown</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topCategories.map(([name, data]) => (
                <div key={name} className="flex items-center gap-3">
                  <span className="text-xl">{data.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-sm">
                      <span className="truncate">{name}</span>
                      <span className="font-medium ml-2">{formatCurrency(data.value)}</span>
                    </div>
                    <div className="coverage-meter mt-1">
                      <div
                        className="coverage-meter-fill bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                        style={{
                          width: `${totalValue > 0 ? (data.value / totalValue) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-[var(--muted-foreground)] w-12 text-right">{data.count} items</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: "/inventory/new", label: "Add Item", icon: "➕", desc: "Add to inventory" },
            { href: "/policies/new", label: "Add Policy", icon: "📋", desc: "Upload policy" },
            { href: "/coverage", label: "Check Gaps", icon: "🔍", desc: "Analyze coverage" },
            { href: "/advisor", label: "Ask AI", icon: "🤖", desc: "Get advice" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="p-4 rounded-lg bg-[var(--secondary)] border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all text-center group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{action.icon}</div>
              <div className="text-sm font-medium">{action.label}</div>
              <div className="text-xs text-[var(--muted-foreground)]">{action.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
