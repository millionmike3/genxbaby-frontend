import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

export default async function InvestorNotificationsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);

  const prisma = await getPrisma();

  const notifications = await prisma.investorNotification.findMany({
    where: { investorId: Number(session.userId) },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">Notifications</h1>
        <p className="text-slate-300 text-lg">
          Performance alerts, distribution notices, and important updates.
        </p>
      </div>

      {notifications.length === 0 && (
        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-300">
            You don’t have any notifications yet. New alerts will appear here
            as your investments update.
          </p>
        </div>
      )}

      {notifications.length > 0 && (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 flex flex-col md:flex-row md:items-start md:justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {n.title ?? "Notification"}
                </h3>
                <p className="text-slate-300 text-sm mt-2">
                  {n.message}
                </p>
                <p className="text-slate-500 text-xs mt-2">
                  {n.createdAt.toDateString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {n.linkUrl && (
                  <a
                    href={n.linkUrl}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-700 text-slate-100 text-sm font-medium hover:bg-slate-600 transition"
                  >
                    View details
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
