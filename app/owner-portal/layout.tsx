"use server";

import { headers, cookies } from "next/headers";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getSession } from "@/lib/session";
import { requireRole } from "@/lib/auth";

function Unauthorized() {
  return (
    <section className="bg-slate-950 text-white p-6 min-h-screen flex items-center justify-center">
      <div className="text-xl font-semibold">Unauthorized: Owner access required</div>
    </section>
  );
}

export default async function OwnerPortalLayout({ children }) {
  // Enforce owner role
  try {
    await requireRole(["owner"]);
  } catch {
    return <Unauthorized />;
  }

  // Read cookies (must be awaited in Next.js 16)
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);

  // Server-side active route detection
  const hdrs = headers();
  const pathname =
    hdrs.get("x-pathname") ||
    hdrs.get("referer") ||
    "";

  const navItems = [
    { name: "Overview", href: "/owner-portal" },
    { name: "Properties", href: "/owner-portal/properties" },
    { name: "Mortgages", href: "/owner-portal/mortgages" },
    { name: "Performance", href: "/owner-portal/performance" },
    { name: "Cashflow", href: "/owner-portal/cashflow" },
    { name: "Equity", href: "/owner-portal/equity" },
    { name: "Portfolio Intelligence", href: "/owner-portal/portfolio-intelligence" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 p-6">
        <h1 className="text-2xl font-bold mb-8">Owner Portal</h1>

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
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
