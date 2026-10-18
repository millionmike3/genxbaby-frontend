import { requireRole, auth } from "@/lib/auth";
import Link from "next/link";

export default async function LoanOfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["LOAN_OFFICER"]);
  const session = await auth();

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className="w-64 bg-slate-800/60 border-r border-slate-700 p-6 space-y-6">
        <h2 className="text-xl font-bold">{session?.user.fullName}</h2>

        <nav className="space-y-3">
          <Link href="/loan-officer-portal">Overview</Link>
          <Link href="/loan-officer-portal/pipeline">Pipeline</Link>
          <Link href="/loan-officer-portal/applications">Applications</Link>
          <Link href="/loan-officer-portal/conditions">Conditions</Link>
          <Link href="/loan-officer-portal/messages">Messages</Link>
        </nav>
      </aside>

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
