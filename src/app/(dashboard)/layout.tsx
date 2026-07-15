import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { IslandNav } from "@/components/layout/island-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden text-[var(--foreground)]">
      {/* Background Image with Overlay */}
      <div
        className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-house.png')" }}
      />
      <div className="fixed inset-0 z-[-1] bg-[#0d0b09]/20" />

      <IslandNav userName={session.user.name || "User"} userEmail={session.user.email || ""} />
      <main className="flex-1 pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-12 relative z-0">
        {children}
      </main>
    </div>
  );
}
