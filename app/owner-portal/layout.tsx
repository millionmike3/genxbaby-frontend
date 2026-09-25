import Link from "next/link";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import { cn } from "@/lib/utils";

export default async function OwnerPortalLayout({ children }) {
  // Auth check
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);

  if (!session) throw new Error("Not authenticated");
  if (session.role !== "owner") throw new Error("Unauthorized");

  const navItems = [
  { name: "Overview", href: "/owner-portal" },
  { name: "Properties", href: "/owner-portal/properties" },
  { name: "Mortgages", href: "/owner-portal/mortgages" },
  { name: "Performance", href: "/owner-portal/performance" },
  { name: "Cashflow", href: "/owner-portal/cashflow" },
  { name: "Equity", href: "/owner-portal/equity" },
  { name: "Portfolio Intelligence", href: "/owner-portal/portfolio-intelligence" }
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
