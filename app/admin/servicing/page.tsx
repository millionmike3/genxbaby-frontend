import { requireRole } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ServicingEnginePage() {
  await requireRole(["ADMIN"]);
  const admin = await getCurrentUser();

  if (!admin) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-3xl">Not authenticated</h1>
      </main>
    );
  }

  // Fetch servicing intelligence grouped by application
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      loanServicingEvents: true,
      servicingRiskSignal: true,
      servicingEventScore: true,
      servicingRecord: true,

    },
  });

  return (
    <main className="min-h-screen bg-slate-900 text-white p-10 space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-[#3CF46B]">Servicing Engine</h1>
        <p className="text-slate-300 mt-2">
          Real‑time servicing intelligence across all active loans.
        </p>
      </header>

      <section className="bg-neutral-800/40 border border-neutral-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold">Servicing Intelligence</h2>

        <table className="w-full text-left">
          <thead className="text-slate-400 border-b border-neutral-700">
            <tr>
              <th className="py-2">Loan ID</th>
              <th>Borrower</th>
              <th>Property</th>
              <th>Latest Event</th>
              <th>Risk Signal</th>
              <th>Event Score</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => {
              const latestEvent = app.LoanServicingEvent?.[0];
              const risk = app.ServicingRiskSignal;
              const score = app.ServicingEventScore;

              return (
                <tr key={app.id} className="border-b border-neutral-800">
                  <td className="py-2">{app.id}</td>
                  <td>{app.borrowerName ?? "—"}</td>
                  <td>{app.propertyAddress ?? "—"}</td>

                  <td>
                    {latestEvent
                      ? `${latestEvent.eventType}`
                      : "No events"}
                  </td>

                  <td>
                    {risk
                      ? `${risk.signalType} (${risk.strength})`
                      : "—"}
                  </td>

                  <td>
                    {score?.score ?? "—"}
                  </td>

                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
