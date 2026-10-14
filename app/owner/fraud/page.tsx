import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function OwnerFraudIntelligenceDashboard() {
  const prisma = await getPrisma();

  const events = await prisma.fraudEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const highRiskCount = events.filter((e) => e.riskScore >= 80).length;
  const mediumRiskCount = events.filter(
    (e) => e.riskScore >= 50 && e.riskScore < 80
  ).length;
  const lowRiskCount = events.filter((e) => e.riskScore < 50).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10 space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-[#3CF46B]">
          Fraud Intelligence Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Monitoring fraud signals across all applications.
        </p>
      </header>

      {/* Risk Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-red-400">High Risk</h2>
          <p className="text-3xl font-bold mt-2">{highRiskCount}</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-yellow-400">Medium Risk</h2>
          <p className="text-3xl font-bold mt-2">{mediumRiskCount}</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-green-400">Low Risk</h2>
          <p className="text-3xl font-bold mt-2">{lowRiskCount}</p>
        </div>
      </section>

      {/* Event List */}
      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Recent Fraud Events</h2>

        {events.length === 0 ? (
          <p className="text-slate-400">No fraud events recorded.</p>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="border border-neutral-800 rounded p-4 space-y-2"
              >
                <p className="text-sm text-slate-300">
                  <strong>Event:</strong> {event.type}
                </p>
                <p className="text-sm text-slate-300">
                  <strong>Risk Score:</strong>{" "}
                  <span
                    className={
                      event.riskScore >= 80
                        ? "text-red-400"
                        : event.riskScore >= 50
                        ? "text-yellow-400"
                        : "text-green-400"
                    }
                  >
                    {event.riskScore}
                  </span>
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(event.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
