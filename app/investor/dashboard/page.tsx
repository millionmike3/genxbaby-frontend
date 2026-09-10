import { auth } from "@/lib/auth";
import { InvestorDAL } from "@/lib/dal/investor";
import { classify, scoreRisk } from "@/lib/scoring";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default async function InvestorDashboardPage() {
  // Get investorId from session/auth
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Unauthorized</h1>
      </div>
    );
  }

  const investorId = session.user.investorId; // depends on your auth model

  if (!investorId) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">No investor profile found</h1>
      </div>
    );
  }

  // Fetch investor + scoring history
  const investor = await InvestorDAL.getInvestorWithScores(investorId);

  if (!investor) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Investor not found</h1>
      </div>
    );
  }

  const scores = investor.scoringResults || [];
  const latest = scores.length > 0 ? scores[0] : null;
  const previous = scores.length > 1 ? scores[1] : null;

  // Compute risk band
  let riskBand = "Unknown";
  if (latest) {
    riskBand = classify(latest.riskScore, "RISK");
  }

  // Compute impulsiveness band
  let impulsivenessBand = "Unknown";
  if (latest) {
    impulsivenessBand = classify(latest.impulsivenessScore, "INVESTOR");
  }

  // Compute trend vs previous score
  let trend: "up" | "down" | "flat" = "flat";
  if (latest && previous) {
    if (latest.impulsivenessScore > previous.impulsivenessScore) trend = "up";
    else if (latest.impulsivenessScore < previous.impulsivenessScore) trend = "down";
  }

  // Prepare chart data
  const chartData = scores.map((s) => ({
    date: new Date(s.createdAt).toLocaleDateString(),
    risk: s.riskScore,
    impulsiveness: s.impulsivenessScore,
  }));

  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Investor Dashboard</h1>
        <p className="text-slate-400 text-sm">{investor.email}</p>
      </div>

      {/* Behavior Profile Card */}
      <section className="border border-slate-800 rounded-xl p-6 bg-slate-900/70">
        <h2 className="text-lg font-semibold mb-4">Behavior Profile</h2>

        {!latest ? (
          <p className="text-slate-400 text-sm">No scoring data available.</p>
        ) : (
          <div className="space-y-3 text-sm text-slate-200">
            <div>
              <strong>Risk Band:</strong> {riskBand}
            </div>

            <div>
              <strong>Impulsiveness Band:</strong> {impulsivenessBand}
            </div>

            <div>
              <strong>Trend:</strong>{" "}
              {trend === "up"
                ? "Increasing impulsiveness ↑"
                : trend === "down"
                ? "Decreasing impulsiveness ↓"
                : "Stable →"}
            </div>

            <div>
              <strong>Latest Timestamp:</strong>{" "}
              {new Date(latest.createdAt).toLocaleString()}
            </div>

            <a
              href={`/investor/behavior`}
              className="text-blue-400 hover:underline text-sm"
            >
              View full behavior history →
            </a>
          </div>
        )}
      </section>

      {/* Mini Chart */}
      {scores.length > 1 && (
        <section className="border border-slate-800 rounded-xl p-6 bg-slate-900/70">
          <h2 className="text-lg font-semibold mb-4">Behavior Trends</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#f87171"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="impulsiveness"
                stroke="#60a5fa"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      )}
    </div>
  );
}
