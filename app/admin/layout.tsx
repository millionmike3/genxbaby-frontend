import { requireRole } from "@/lib/authz";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["admin"]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">

      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/80">
        <div className="px-4 py-5 text-lg font-semibold tracking-wide text-slate-200">
          GEN X BABY — Admin
        </div>

        <nav className="mt-4 space-y-1 text-sm">
          <Link
            href="/admin"
            className="block px-4 py-2 hover:bg-slate-800 text-slate-300"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/checks"
            className="block px-4 py-2 hover:bg-slate-800 text-slate-300"
          >
            Checks
          </Link>

          <Link
            href="/admin/audit"
            className="block px-4 py-2 hover:bg-slate-800 text-slate-300"
          >
            Audit Trail
          </Link>

          <Link
            href="/admin/roles"
            className="block px-4 py-2 hover:bg-slate-800 text-slate-300"
          >
            Role Management
          </Link>

          <Link
            href="/admin/users"
            className="block px-4 py-2 hover:bg-slate-800 text-slate-300"
          >
            User Management
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-900/60 px-6 py-3 text-sm flex justify-between">
          <span className="text-slate-400">Admin Panel</span>

          <form action="/api/admin/logout" method="post">
            <button className="text-xs text-slate-400 hover:text-slate-200">
              Logout
            </button>
          </form>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
