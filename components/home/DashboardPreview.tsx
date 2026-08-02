"use client";

import Link from "next/link";

export default function DashboardPreview() {
  return (
    <section
      id="dashboard"
      className="px-6 py-12 bg-[#050607] border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-100">
          System Dashboard Preview
        </h2>

        <p className="text-gray-400 mb-8 max-w-2xl">
          A unified control center for audit logs, capital flows, underwriting intelligence,
          identity‑secured data, and community asset tracking — forming the operational backbone
          of the GenXBaby financial infrastructure.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <DashboardTile label="Capital Flow Activity" value="Live" />
          <DashboardTile label="Underwriting Intelligence" value="Active" />
          <DashboardTile label="Identity Vault Metrics" value="Secured" />
        </div>

        <div className="mt-8">
          <Link
            href="/admin"
            className="inline-flex px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition text-sm font-semibold"
          >
            Open Admin Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

function DashboardTile({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-sm font-semibold text-[#3CF46B]">{value}</div>
    </div>
  );
}
