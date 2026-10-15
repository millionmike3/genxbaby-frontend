// app/admin/dashboard/page.tsx (or app/admin/page.tsx depending on your route)
import { requireRole } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Use your existing auth guard
  await requireRole(["admin"]);

  // Use the canonical session resolver
  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Not authenticated</h1>
          <Link href="/admin/login" className="text-[#3CF46B] underline">
            Go to Admin Login
          </Link>
        </div>
      </main>
    );
  }

  if (user.role !== "admin") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Unauthorized</h1>
          <p className="text-slate-400">Admin access required.</p>
        </div>
      </main>
    );
  }

  const fullName = user.username ?? user.email ?? "Admin";

  return (
    <main className="min-h-screen bg-slate-900 text-white px-6 md:px-12 lg:px-20 py-16 space-y-12">

      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-4xl font-bold text-[#3CF46B]">
          Admin Dashboard
        </h1>
        <p className="text-slate-300">
          Welcome back, {fullName} — full system control is active.
        </p>
      </header>

      {/* KPI Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">System Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard title="Total Users" value="—" />
          <DashboardCard title="Borrowers" value="—" />
          <DashboardCard title="Investors" value="—" />
          <DashboardCard title="Active Applications" value="—" />
          <DashboardCard title="Fraud Events" value="—" />
          <DashboardCard title="Pricing Signals" value="—" />
        </div>
      </section>

      {/* Navigation Links */}
      <section className="bg-neutral-800/40 border border-neutral-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-[#3CF46B]">
          Admin Tools
        </h2>

        <ul className="space-y-3 text-slate-300">
          <li><Link href="/admin/users">User Management</Link></li>
          <li><Link href="/admin/mortgages">Mortgage Applications</Link></li>
          <li><Link href="/admin/properties">Property Intelligence</Link></li>
          <li><Link href="/admin/pricing">Pricing Engine</Link></li>
          <li><Link href="/admin/underwriting">Underwriting Dashboard</Link></li>
          <li><Link href="/admin/fraud">Fraud Intelligence</Link></li>
          <li><Link href="/admin/investors">Investor Pricing Sheets</Link></li>
          <li><Link href="/admin/servicing">Servicing Engine</Link></li>
          <li><Link href="/admin/pipeline">Pipeline Dashboard</Link></li>
          <li><Link href="/admin/analytics">System Analytics</Link></li>
          <li><Link href="/admin/config">Configuration & Integrations</Link></li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="pt-10 text-slate-500 text-sm">
        GenXBaby OS — Institutional‑grade financial intelligence.
      </footer>
    </main>
  );
}

function DashboardCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="border border-neutral-700 bg-neutral-800/40 rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-medium text-slate-300">{title}</h3>
      <p className="text-3xl font-bold mt-2 text-[#3CF46B]">{value}</p>
    </div>
  );
}
