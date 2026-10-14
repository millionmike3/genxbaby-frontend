
import { getPrisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function OwnerBehavioralIntelligenceDashboard() {
  const prisma = await getPrisma();

  const sessions = await prisma.behaviorSession.findMany({
    orderBy: { startedAt: "desc" },
    take: 200,
  });

  const totalSessions = sessions.length;
  const avgEngagementScore =
    sessions.reduce((sum, s) => sum + (s.engagementScore ?? 0), 0) /
    (totalSessions || 1);
  const avgStressScore =
    sessions.reduce((sum, s) => sum + (s.stressScore ?? 0), 0) /
    (totalSessions || 1);
  const avgDecisionSpeedSeconds =
    sessions.reduce((sum, s) => sum + (s.decisionTimeSeconds ?? 0), 0) /
    (totalSessions || 1);

  const highRiskSessions = sessions.filter(
    (s) => (s.fraudRiskScore ?? 0) >= 80
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 space-y-12">
      <h1 className="text-4xl font-bold text-[#3CF46B]">
        Owner Behavioral Intelligence Dashboard
      </h1>

      <p className="text-slate-300 text-sm">
        Behavioral signals across borrowers, loans, and sessions — engagement, stress, risk, and decision patterns.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Total Sessions" value={totalSessions} />
        <Card title="Avg Engagement Score" value={avgEngagementScore.toFixed(1)} />
        <Card title="Avg Stress Score" value={avgStressScore.toFixed(1)} />
        <Card
          title="Avg Decision Speed"
          value={`${avgDecisionSpeedSeconds.toFixed(1)}s`}
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="High‑Risk Behavioral Sessions" value={highRiskSessions} />
      </section>

      <section className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-[#3CF46B] mb-4">
          Recent Behavioral Sessions
        </h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-2">Timestamp</th>
              <th className="text-left py-2">Loan</th>
              <th className="text-left py-2">Engagement</th>
              <th className="text-left py-2">Stress</th>
              <th className="text-left py-2">Decision Speed</th>
              <th className="text-left py-2">Fraud Risk</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => (
              <tr key={s.id} className="border-t border-neutral-800">
                <td className="py-2">
                  {new Date(s.startedAt).toLocaleString()}
                </td>
                <td className="py-2">{s.loanId}</td>
                <td className="py-2">
                  <span
                    className={
                      (s.engagementScore ?? 0) >= 80
                        ? "text-[#3CF46B]"
                        : (s.engagementScore ?? 0) >= 50
                        ? "text-yellow-300"
                        : "text-slate-300"
                    }
                  >
                    {s.engagementScore}
                  </span>
                </td>
                <td className="py-2">
                  <span
                    className={
                      (s.stressScore ?? 0) >= 80
                        ? "text-red-400"
                        : (s.stressScore ?? 0) >= 50
                        ? "text-yellow-300"
                        : "text-[#3CF46B]"
                    }
                  >
                    {s.stressScore}
                  </span>
                </td>
                <td className="py-2">
                  {(s.decisionTimeSeconds ?? 0).toFixed(1)}s
                </td>
                <td className="py-2">
                  <span
                    className={
                      (s.fraudRiskScore ?? 0) >= 80
                        ? "text-red-400"
                        : (s.fraudRiskScore ?? 0) >= 50
                        ? "text-yellow-300"
                        : "text-[#3CF46B]"
                    }
                  >
                    {s.fraudRiskScore}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
