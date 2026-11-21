import { requireRole } from "@/lib/auth";
import Link from "next/link";

function Unauthorized() {
  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-xl font-semibold">
        Unauthorized: Underwriter access required
      </div>
    </section>
  );
}

export default async function UnderwriterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session;

  try {
    session = await requireRole(["UNDERWRITER"]);
  } catch {
    return <Unauthorized />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className="w-64 bg-slate-800/60 border-r border-slate-700 p-6 space-y-6">
        <h2 className="text-xl font-bold">{session.fullName}</h2>

        <nav className="space-y-3">
          <Link href="/underwriter-portal">Underwriting Dashboard</Link>
          <Link href="/underwriter-portal/uw-queue">UW Queue</Link>
          <Link href="/underwriter-portal/risk-signals">Risk Signals</Link>
          <Link href="/underwriter-portal/fraud-events">Fraud Events</Link>
          <Link href="/underwriter-portal/decisions">Decisions</Link>
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