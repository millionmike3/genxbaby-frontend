import { ScoringDAL } from "@/lib/dal/scoring";

type ScoreRecord = {
  id: string;
  userId: string | null;
  fraudScore: number | null;
  riskScore: number | null;
  impulsivenessScore: number | null;
  factors: Record<string, any>;
  createdAt: string | Date;
  rawData?: any;
};

export default async function AdminAnalyticsPage() {
  const since = new Date();
  since.setDate(since.getDate() - 7);

  const recent: ScoreRecord[] = await ScoringDAL.getRecentScores(200, since);

  if (recent.length === 0) {
    return <div className="p-6">No scoring data yet.</div>;
  }

  const highestRisk = [...recent].sort(
    (a, b) => (b.riskScore ?? 0) - (a.riskScore ?? 0)
  );

  const avgFraud =
    recent.reduce((a, r) => a + (r.fraudScore ?? 0), 0) / recent.length;

  const avgRisk =
    recent.reduce((a, r) => a + (r.riskScore ?? 0), 0) / recent.length;

  const avgImp =
    recent.reduce((a, r) => a + (r.impulsivenessScore ?? 0), 0) / recent.length;

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-slate-800 rounded-lg p-4">
          <div className="text-xs text-slate-400">Avg Fraud (7d)</div>
          <div className="text-xl font-semibold">{avgFraud.toFixed(1)}</div>
        </div>

        <div className="border border-slate-800 rounded-lg p-4">
          <div className="text-xs text-slate-400">Avg Risk (7d)</div>
          <div className="text-xl font-semibold">{avgRisk.toFixed(1)}</div>
        </div>

        <div className="border border-slate-800 rounded-lg p-4">
          <div className="text-xs text-slate-400">Avg Impulsiveness (7d)</div>
          <div className="text-xl font-semibold">{avgImp.toFixed(1)}</div>
        </div>
      </div>

      <section className="border border-slate-800 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Highest‑Risk Users</h2>

        <table className="w-full text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="py-2 text-left">User</th>
              <th className="py-2 text-left">Fraud</th>
              <th className="py-2 text-left">Risk</th>
              <th className="py-2 text-left">Impulsiveness</th>
              <th className="py-2 text-left">Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {highestRisk.slice(0, 20).map((r) => (
              <tr key={r.id} className="border-b border-slate-800">
                <td className="py-2">{r.userId ?? "N/A"}</td>
                <td className="py-2">{r.fraudScore ?? 0}</td>
                <td className="py-2">{r.riskScore ?? 0}</td>
                <td className="py-2">{r.impulsivenessScore ?? 0}</td>
                <td className="py-2">
                  {new Date(r.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
