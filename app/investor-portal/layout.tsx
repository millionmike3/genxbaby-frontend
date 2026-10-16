import "@/app/globals.css";
import { ReactNode } from "react";
import { headers } from "next/headers";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { auth, requireRole } from "@/lib/auth";
import InvestorSidebar from "@/dashboard/layout/investor/sidebar";

function Unauthorized() {
  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Unauthorized</h1>
        <p className="text-slate-300">Investor access required to view this portal.</p>
      </div>
    </section>
  );
}

export default async function InvestorPortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 🔒 Enforce investor role
  try {
    await requireRole(["INVESTOR"]);
  } catch {
    return <Unauthorized />;
  }

  // 🔐 Read verified session
  const session = await auth();
  if (!session?.user) return <Unauthorized />;

  // 📍 Correct pathname detection for Next.js 16
  const hdrs = headers();
  const pathname = hdrs.get("next-url") || "";

  const navItems = [
    { name: "Overview", href: "/investor-portal" },
    { name: "Portfolio", href: "/investor-portal/portfolio" },
    { name: "Deals", href: "/investor-portal/deals" },
    { name: "Commitments", href: "/investor-portal/commitments" },
    { name: "Analytics", href: "/investor-portal/analytics" },
    { name: "Messages", href: "/investor-portal/messages" },
  ];

  return (
    <section className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 p-6">
        <h1 className="text-2xl font-bold mb-8">Investor Portal</h1>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition",
                  isActive && "bg-slate-700 text-white"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </section>
  );
}
