import Link from "next/link";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  // Read verified session
  const session = await auth();

  if (!session?.userId) {
    return (
      <section className="bg-slate-950 text-white p-6 min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Unauthorized: No active session</div>
      </section>
    );
  }

  // Active route detection removed (it was crashing)
  const pathname = "";

  // Define nav menus per role
  const navMenus: Record<string, { name: string; href: string }[]> = {
    OWNER: [
      { name: "Overview", href: "/owner-portal" },
      { name: "Properties", href: "/owner-portal/properties" },
      { name: "Mortgages", href: "/owner-portal/mortgages" },
      { name: "Performance", href: "/owner-portal/performance" },
      { name: "Cashflow", href: "/owner-portal/cashflow" },
      { name: "Equity", href: "/owner-portal/equity" },
      { name: "Portfolio Intelligence", href: "/owner-portal/portfolio-intelligence" },
    ],
    ADMIN: [
      { name: "Dashboard", href: "/admin-portal" },
      { name: "Users", href: "/admin-portal/users" },
      { name: "Reports", href: "/admin-portal/reports" },
    ],
    INVESTOR: [
      { name: "Overview", href: "/investor-portal" },
      { name: "Portfolio", href: "/investor-portal/portfolio" },
      { name: "Performance", href: "/investor-portal/performance" },
    ],
    PROCESSOR: [
      { name: "Document Checklist", href: "/processor-portal" },
      { name: "Verification Queue", href: "/processor-portal/verification" },
      { name: "Application Files", href: "/processor-portal/files" },
      { name: "OCR Extractions", href: "/processor-portal/ocr" },
      { name: "Requirements Tracker", href: "/processor-portal/requirements" },
    ],
    UNDERWRITER: [
      { name: "Overview", href: "/underwriter-portal" },
      { name: "Risk Analysis", href: "/underwriter-portal/risk" },
      { name: "Approvals", href: "/underwriter-portal/approvals" },
      { name: "Reports", href: "/underwriter-portal/reports" },
    ],
  };

  // Pick nav items for current role
  const navItems = navMenus[session.role] || [];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className="w-64 bg-slate-800 border-r border-slate-700 p-6">
        <h1 className="text-2xl font-bold mb-8">
          {session.role} Portal
        </h1>

        {navItems.length > 0 ? (
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
        ) : (
          <div className="text-slate-400">
            No navigation defined for role {session.role}
          </div>
        )}

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
