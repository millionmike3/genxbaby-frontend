import { requireRole, auth } from "@/lib/auth";
import Link from "next/link";

export default async function UnderwriterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["UNDERWRITER"]);
  const session = await auth();

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className="w-64 bg-slate-800/60 border-r border-slate-700 p-6 space-y-6">
        <h2 className="text-xl font-bold">{session?.user.fullName}</h2>

        <nav className="space-y-3">
          <Link href="/underwriter-portal">Underwriting Dashboard</Link>
          <Link href="/underwriter-portal/uw-queue">UW Queue</Link>
          <Link href="/underwriter-portal/risk-signals">Risk Signals</Link>
          <Link href="/underwriter-portal/fraud-events">Fraud Events</Link>
          <Link href="/underwriter-portal/decisions">Decisions</Link>
        </nav>
        <button
    type="submit"
    className="mt-6 w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
  >
    Logout
  </button>
      </aside>
<form action="/api/logout" method="post">
  
</form>

      <main className="flex-1 p-10">{children}</main>
      
    </div>
    
  );
}
