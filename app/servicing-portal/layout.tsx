import { requireRole } from "@/lib/auth";
import Link from "next/link";

function Unauthorized() {
  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-xl font-semibold">
        Unauthorized: Servicing access required
      </div>
    </section>
  );
}

export default async function ServicingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session;

  try {
    session = await requireRole(["SERVICING"]);
  } catch {
    return <Unauthorized />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className="w-64 bg-slate-800/60 border-r border-slate-700 p-6 space-y-6">
        <h2 className="text-xl font-bold">{session.fullName}</h2>

        <nav className="space-y-3">
          <Link href="/servicing-portal">Servicing Dashboard</Link>
          <Link href="/servicing-portal/active-loans">Active Loans</Link>
          <Link href="/servicing-portal/payments">Payment History</Link>
          <Link href="/servicing-portal/escrow">Escrow & Delinquency</Link>
          <Link href="/servicing-portal/covenants">Covenant Monitoring</Link>
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