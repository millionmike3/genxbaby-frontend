import "@/app/globals.css";
import { ReactNode } from "react";
import { headers } from "next/headers";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { auth, requireRole } from "@/lib/auth";

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

  // 🔐 Read verified session safely
  let session;
  try {
    session = await auth();
  } catch {
    return <Unauthorized />;
  }

  if (!session?.user) return <Unauthorized />;

  // 📍 SAFE Next.js 16 pathname detection
  const hdrs = await headers();
  const pathname =
    hdrs.get("x-invoke-path") ??
    hdrs.get("referer") ??
    "/investor-portal";

  // ⭐ FULL INVESTOR PORTAL NAVIGATION
  const navItems = [
    { name: "Dashboard", href: "/investor-portal" },
    { name: "Proof of Funds", href: "/investor-portal/proof-of-funds" },
    { name: "Deal Prospecting", href: "/investor-portal/deal-prospecting" },
    { name: "Certified Check", href: "/investor-portal/certified-check" },
    { name: "Mortgage LOS", href: "/investor-portal/mortgage-los" },
    { name: "CRM", href: "/investor-portal/crm" },
    { name: "Dialer", href: "/investor-portal/dialer" },
    { name: "Messaging", href: "/investor-portal/messaging" },
    { name: "Email", href: "/investor-portal/email" },
    { name: "Stock Sanitizer", href: "/investor-portal/stock-sanitizer" },
    { name: "Lending Sanitizer", href: "/investor-portal/lending-sanitizer" },
    { name: "Productivity Sanitizer", href: "/investor-portal/productivity-sanitizer" },
    { name: "Behavioral Risk Engine", href: "/investor-portal/behavioral-risk-engine" },
    { name: "Customer Behavior", href: "/investor-portal/customer-behavior" },
    { name: "Lead Behavior", href: "/investor-portal/lead-behavior" },
    { name: "Pricing Engine", href: "/investor-portal/pricing-engine" },
  ];

  return (
    <section className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-800 border-r border-slate-700 p-6">
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

        {/* Logout */}
        <form action="/api/logout" method="post">
          <button
            type="submit"
            className="mt-6 w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
          >
            Logout
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </section>
  );
}
