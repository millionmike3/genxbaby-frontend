"use server";

import { getPrisma } from "@/lib/prisma";

async function getOnboardingApps() {
  const prisma = await getPrisma();

  return prisma.investorOnboarding.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      investor: true,
    },
    take: 200,
  });
}

export default async function AdminOnboardingPage() {
  const apps = await getOnboardingApps();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Investor Onboarding</h1>
      <p className="text-sm text-slate-400 mb-6">
        Review investor applications, approve onboarding, or reject applicants.
      </p>

      <table className="w-full text-sm text-slate-300">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="py-2 text-left">Investor</th>
            <th className="py-2 text-left">Email</th>
            <th className="py-2 text-left">Status</th>
            <th className="py-2 text-left">Submitted</th>
            <th className="py-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {apps.map((app) => (
            <tr key={app.id} className="border-b border-slate-900">
              <td className="py-2">{app.investor?.name ?? "Unknown"}</td>
              <td className="py-2">{app.investor?.email ?? "N/A"}</td>

              <td className="py-2">
                <span
                  className={
                    app.status === "APPROVED"
                      ? "text-green-400"
                      : app.status === "REJECTED"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }
                >
                  {app.status}
                </span>
              </td>

              <td className="py-2">
                {new Date(app.createdAt).toLocaleString()}
              </td>

              <td className="py-2">
                {app.status === "PENDING" ? (
                  <div className="flex gap-2">

                    {/* APPROVE */}
                    <form action="/api/admin/onboarding/approve" method="POST">
                      <input type="hidden" name="id" value={app.id} />
                      <button
                        type="submit"
                        className="px-3 py-1 rounded bg-green-600 text-white text-xs font-semibold"
                      >
                        Approve
                      </button>
                    </form>

                    {/* REJECT */}
                    <form action="/api/admin/onboarding/reject" method="POST">
                      <input type="hidden" name="id" value={app.id} />
                      <button
                        type="submit"
                        className="px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold"
                      >
                        Reject
                      </button>
                    </form>
                  </div>
                ) : (
                  <span className="text-slate-500 text-xs">No actions</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
