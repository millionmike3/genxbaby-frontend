import { requireRole } from "@/lib/authz";
import Link from "next/link";

export default async function BorrowerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["borrower"]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">

      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/80">
        <div className="px-4 py-5 text-lg font-semibold tracking-wide text-slate-200">
          Borrower Portal
        </div>

        <nav className="mt-4 space-y-1 text-sm">
          <Link
            href="/borrower"
            className="block px-4 py-2 hover:bg-slate-800 text-slate-300"
          >
            Overview
          </Link>

          <Link
            href="/borrower/docs"
            className="block px-4 py-2 hover:bg-slate-800 text-slate-300"
          >
            Documents
          </Link>

          <Link
            href="/borrower/status"
            className="block px-4 py-2 hover:bg-slate-800 text-slate-300"
          >
            Loan Status
          </Link>
        </nav>
      </aside>

      <main className="flex-1 px-6 py-6">{children}</main>
    </div>
  );
}
