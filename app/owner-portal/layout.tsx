import Link from "next/link";
import { cn } from "@/lib/utils";
import { auth, requireRole } from "@/lib/auth";

function Unauthorized() {
  return (
    <section className="bg-slate-950 text-white p-6 min-h-screen flex items-center justify-center">
      <div className="text-xl font-semibold">Unauthorized: Owner access required</div>
    </section>
  );
}

export default async function OwnerPortalLayout({ children }) {
  // Enforce correct role
  try {
    await requireRole(["OWNER"]);
  } catch {
    return <Unauthorized />;
  }

  // Read verified session
  const session = await auth();
  if (!session?.user) {
    return <Unauthorized />;
  }

  // Active route detection removed (it was crashing)
  const pathname = "";

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

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
