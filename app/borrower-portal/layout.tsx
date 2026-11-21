import { headers } from "next/headers";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { requireRole } from "@/lib/auth";

function Unauthorized() {
  return (
    <section className="bg-slate-950 text-white p-6 min-h-screen flex items-center justify-center">
      <div className="text-xl font-semibold">
        Unauthorized: Borrower access required
      </div>
    </section>
  );
}

export default async function BorrowerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session;

  try {
    session = await requireRole(["BORROWER"]);
  } catch {
    return <Unauthorized />;
  }

  const hdrs = await headers();
  const pathname = hdrs.get("next-url") || "/borrower-portal";

  const navItems = [
    { name: "Overview", href: "/borrower-portal" },
    { name: "Loan Status", href: "/borrower-portal/status" },
    { name: "Documents", href: "/borrower-portal/documents" },
    { name: "Disbursement", href: "/borrower-portal/disbursement" },
    { name: "Application", href: "/borrower-portal/application" },
    { name: "Messages", href: "/borrower-portal/messages" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className="w-64 bg-slate-800 border-r border-slate-700 p-6">
        <h1 className="text-2xl font-bold mb-2">Borrower Portal</h1>
        <p className="text-sm text-slate-400 mb-8">
          {session.fullName}
        </p>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

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