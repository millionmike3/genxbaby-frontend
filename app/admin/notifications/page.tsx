"use server";

import { getPrisma } from "@/lib/prisma";

async function getNotifications() {
  const prisma = await getPrisma();

  return prisma.adminNotification.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}

export default async function AdminNotificationsPage() {
  const notes = await getNotifications();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Notification Center</h1>
      <p className="text-sm text-slate-400 mb-6">
        System alerts, underwriting events, fraud signals, document approvals, and investor actions.
      </p>

      <div className="space-y-4">
        {notes.map((n) => (
          <div
            key={n.id}
            className="border border-slate-800 rounded-lg p-4 text-sm bg-slate-900/40"
          >
            <div className="flex justify-between">
              <div>
                <div className="text-lg font-semibold">{n.title}</div>
                <div className="text-slate-300 mt-1">{n.message}</div>
              </div>

              <div className="text-right text-slate-400 text-xs">
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
