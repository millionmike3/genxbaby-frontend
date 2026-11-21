
import Link from "next/link";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Retrieve the verified session from the centralized authentication system.
  const session = await auth();

  // Only authenticated OWNER users may access this portal.
  if (!session?.userId || session.role !== "OWNER") {
    return (
      <section className="bg-slate-950 text-white p-6 min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">
          Unauthorized: Owner access required
        </div>
      </section>
    );
  }

  const navItems = [
    { name: "Overview", href: "/owner-portal" },
    { name: "Properties", href: "/owner-portal/properties" },
    { name: "Mortgages", href: "/owner-portal/mortgages" },
    { name: "Performance", href: "/owner-portal/performance" },
    { name: "Cashflow", href: "/owner-portal/cashflow" },
    { name: "Equity", href: "/owner-portal/equity" },
    {
      name: "Portfolio Intelligence",
      href: "/owner-portal/portfolio-intelligence",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className="w-64 bg-slate-800 border-r border-slate-700 p-6">
        <h1 className="text-2xl font-bold mb-2">OWNER Portal</h1>

        <p className="text-sm text-slate-400 mb-8">
          {session.fullName || session.user?.fullName || "Owner"}
        </p>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <form action="/api/logout" method="post">
          <button
            type="submit"
            className="mt-6 w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
          >
            Logout
          </button>
        </form>
      </aside>

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
