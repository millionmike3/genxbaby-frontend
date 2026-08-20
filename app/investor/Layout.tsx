import { requireRole } from "@/lib/authz";
import Link from "next/link";

export default async function InvestorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["investor"]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">

      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/80">
        <div className="px-4 py-5 text-lg font-semibold tracking-wide text-slate-200">
          Investor Portal
        </div>

        <nav className="mt-4 space-y-1 text-sm">
          <Link
            href="/investor"
            className="block px-4 py-2 hover:bg-slate-800 text-slate-300"
          >
            Overview
          </Link>

          <Link
            href="/investor/positions"
            className="block px-4 py-2 hover:bg-slate-800 text-slate-300"
          >
            Positions
          </Link>

          <Link
            href="/investor/statements"
            className="block px-4 py-2 hover:bg-slate-800 text-slate-300"
          >
            Statements
          </Link>
        </nav>
      </aside>

      <main className="flex-1 px-6 py-6">{children}</main>
    </div>
  );
}
