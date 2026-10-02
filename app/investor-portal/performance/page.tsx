import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import { InvestorPerformanceChart } from "../_components/InvestorCharts";

export default async function InvestorPerformancePage() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);

  const prisma = await getPrisma();

  // Latest snapshot for KPI metrics
  const perf = await prisma.investorPerformanceSnapshot.findFirst({
    where: { investorId: Number(session.userId) },
    orderBy: { createdAt: "desc" },
  });

  const metrics = perf?.metrics ?? {};

  // Time-series snapshots for chart
  const snapshots = await prisma.investorPerformanceSnapshot.findMany({
    where: { investorId: Number(session.userId) },
    orderBy: { createdAt: "asc" },
    take: 12,
  });

  const chartData = snapshots.map((s) => ({
    label: s.createdAt.toLocaleDateString(),
    irr: s.metrics?.irr ?? 0,
    volatility: s.metrics?.volatility ?? 0,
  }));

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Performance</h1>
        <p className="text-slate-300 text-lg">
          Your portfolio’s risk‑adjusted performance metrics and historical trends.
        </p>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "IRR", value: metrics.irr },
          { label: "Volatility", value: metrics.volatility },
          { label: "Sharpe Ratio", value: metrics.sharpe },
          { label: "Max Drawdown", value: metrics.maxDrawdown },
        ].map((m) => (
          <div
            key={m.label}
            className="bg-slate-800/60 p-6 rounded-xl border border-slate-700"
          >
            <h3 className="text-sm text-slate-300">{m.label}</h3>
            <p className="text-3xl font-semibold mt-2">
              {m.value !== undefined
                ? typeof m.value === "number"
                  ? `${(m.value * 100).toFixed(2)}%`
                  : m.value
                : "—"}
            </p>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <InvestorPerformanceChart data={chartData} />
    </div>
  );
}
