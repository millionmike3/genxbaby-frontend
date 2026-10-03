"use server";

import { requireRole } from "@/lib/auth";
import { getPrisma } from "@/lib/db/prisma";

export default async function AdminPortalSessionsPage() {
  // Enforce admin role
  await requireRole(["admin"]);

  const prisma = await getPrisma();

  // Fetch recent sessions
  const sessions = await prisma.session.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      user: true,
    },
  });

  return (
    <div className="space-y-10 text-white px-6 md:px-12 lg:px-20 py-16 bg-slate-900">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">User Sessions</h1>
        <p className="text-slate-300 text-lg">
          View active and historical user sessions, including login activity,
          device metadata, and session lifecycle.
        </p>
      </div>

      {/* Sessions Table */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-300 border-b border-slate-700">
              <th className="py-3">User</th>
              <th className="py-3">Email</th>
              <th className="py-3">Created</th>
              <th className="py-3">Last Active</th>
              <th className="py-3">IP</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>

          <tbody className="text-slate-400">
            {sessions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-slate-500">
                  No sessions found.
                </td>
              </tr>
            ) : (
              sessions.map((s) => (
                <tr key={s.id} className="border-b border-slate-700/50">
                  <td className="py-3">{s.user?.name ?? "Unknown"}</td>
                  <td className="py-3">{s.user?.email ?? "—"}</td>
                  <td className="py-3">
                    {new Date(s.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3">
                    {s.lastActiveAt
                      ? new Date(s.lastActiveAt).toLocaleString()
                      : "—"}
                  </td>
                  <td className="py-3">{s.ipAddress ?? "—"}</td>
                  <td className="py-3">
                    {s.revoked ? (
                      <span className="text-red-400 font-semibold">
                        Revoked
                      </span>
                    ) : (
                      <span className="text-green-400 font-semibold">
                        Active
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
