"use server";

import { requireRole } from "@/lib/auth";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import Link from "next/link";

export default async function AdminDashboardPage() {
  // Require admin role
  await requireRole(["admin"]);

  // Validate session
  const cookieStore = cookies();
  const token = cookieStore.get("admin_token")?.value;
  const session = await getSession(token);

  if (!session) throw new Error("Not authenticated");
  if (session.role !== "admin") throw new Error("Unauthorized");

  return (
    <main className="min-h-screen bg-slate-900 text-white px-6 md:px-12 lg:px-20 py-16 space-y-12">

      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-4xl font-bold text-[#3CF46B]">
          Admin Dashboard
        </h1>
        <p className="text-slate-300">
          Welcome back, {session.fullName ?? "Admin"} — full system control is active.
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
          <li>
            <Link href="/admin/users" className="hover:text-[#3CF46B]">
              User Management
            </Link>
          </li>
          <li>
            <Link href="/admin/analytics" className="hover:text-[#3CF46B]">
              System Analytics
            </Link>
          </li>
          <li>
            <Link href="/admin/fraud" className="hover:text-[#3CF46B]">
              Fraud Intelligence
            </Link>
          </li>
          <li>
            <Link href="/admin/config" className="hover:text-[#3CF46B]">
              Configuration & Integrations
            </Link>
          </li>
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
