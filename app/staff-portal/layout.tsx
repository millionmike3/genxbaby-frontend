import { requireRole, auth } from "@/lib/auth";
import Link from "next/link";

export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["STAFF"]);
  const session = await auth();

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className="w-64 bg-slate-800/60 border-r border-slate-700 p-6 space-y-6">
        <h2 className="text-xl font-bold">{session?.user.fullName}</h2>

        <nav className="space-y-3">
          <Link href="/staff-portal">Staff Dashboard</Link>
          <Link href="/staff-portal/tasks">Internal Tasks</Link>
          <Link href="/staff-portal/communications">Communications</Link>
          <Link href="/staff-portal/directory">Company Directory</Link>
        </nav>
      </aside>

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
