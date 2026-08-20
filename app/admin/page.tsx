import { requireRole } from "@/lib/authz";

export default async function AdminHome() {
  // Enforce admin-only access
  const session = await requireRole(["admin"]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-50">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-slate-400 text-sm">
          Welcome back, {session.userId}. System metrics and administrative tools are below.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-xs text-slate-400">Checks Registered</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-400">1,248</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-xs text-slate-400">Anchored On‑Chain</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-400">1,248</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-xs text-slate-400">Discrepancies</p>
          <p className="mt-2 text-2xl font-semibold text-rose-400">0</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/admin/checks"
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 hover:bg-slate-800 transition"
        >
          <p className="text-lg font-medium text-slate-200">Manage Checks</p>
          <p className="mt-1 text-sm text-slate-400">
            View, approve, reject, and anchor checks.
          </p>
        </a>

        <a
          href="/admin/audit"
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 hover:bg-slate-800 transition"
        >
          <p className="text-lg font-medium text-slate-200">Audit Trail</p>
          <p className="mt-1 text-sm text-slate-400">
            Review blockchain‑verified events.
          </p>
        </a>

        <a
          href="/admin/roles"
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 hover:bg-slate-800 transition"
        >
          <p className="text-lg font-medium text-slate-200">Role Management</p>
          <p className="mt-1 text-sm text-slate-400">
            Assign or revoke admin privileges.
          </p>
        </a>
      </div>
    </div>
  );
}
