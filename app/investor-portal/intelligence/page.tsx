import { getPrisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import { InvestorAllocationPieChart } from "../_components/InvestorCharts";
import { InvestorRiskHeatmap } from "../_components/InvestorRiskHeatmap";
import { InvestorDiversificationRadar } from "../_components/InvestorDiversificationRadar";

export default async function InvestorIntelligencePage() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);

  const prisma = await getPrisma();

  const div = await prisma.investorDiversificationAnalytics.findFirst({
    where: { investorId: Number(session.userId) },
    orderBy: { createdAt: "desc" },
  });

  const alloc = await prisma.investorAllocationDynamics.findFirst({
    where: { investorId: Number(session.userId) },
    orderBy: { createdAt: "desc" },
  });

  const risk = await prisma.investorRiskScore.findFirst({
    where: { investorId: Number(session.userId) },
  });

  const allocationData = alloc
    ? Object.entries(alloc.allocation ?? {}).map(([label, value]) => ({
        label,
        value,
      }))
    : [];

  const heatmapData = div
    ? Object.entries(div.factors ?? {}).map(([factor, value], index) => ({
        factor,
        value,
        index: index / Object.keys(div.factors).length,
      }))
    : [];

  const radarData = div
    ? Object.entries(div.factors ?? {}).map(([factor, value]) => ({
        factor,
        value,
      }))
    : [];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">Portfolio Intelligence</h1>
        <p className="text-slate-300 text-lg">
          AI‑powered insights to optimize your investment portfolio.
        </p>
      </div>

      {/* Allocation Pie Chart */}
      <InvestorAllocationPieChart data={allocationData} />

      {/* Diversification Radar Chart */}
      <InvestorDiversificationRadar data={radarData} />

      {/* Risk Heatmap */}
      <InvestorRiskHeatmap data={heatmapData} />

      {/* Intelligence Cards */}
      <div className="space-y-6">
        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold">Risk Score</h3>
          <p className="text-3xl font-bold mt-2">
            {risk?.score?.toFixed(2) ?? "—"}
          </p>
        </div>

        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold">Diversification (Raw)</h3>
          <pre className="bg-slate-900/70 p-3 rounded-lg text-xs mt-2">
            {JSON.stringify(div?.factors ?? {}, null, 2)}
          </pre>
        </div>

        <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold">Allocation Mix (Raw)</h3>
          <pre className="bg-slate-900/70 p-3 rounded-lg text-xs mt-2">
            {JSON.stringify(alloc?.allocation ?? {}, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
