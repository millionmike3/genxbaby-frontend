import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";

import { computePortfolioScore } from "@/lib/portfolioScoring";
import { computePortfolioValuation } from "@/lib/portfolioValuation";

import PortfolioRiskMatrix from "../_components/PortfolioRiskMatrix";

import PortfolioDiversification, {
  DiversificationSummary
} from "../_components/PortfolioDiversification";

import {
  PortfolioEquityChart,
  PortfolioRiskChart,
} from "../_components/PortfolioCharts";

export default async function OwnerPortfolioIntelligencePage() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;
  const session = await getSession(token);

  if (!session) throw new Error("Not authenticated");
  if (session.role !== "owner") throw new Error("Unauthorized");

  const ownerId = Number(session.userId);

  const properties = await prisma.property.findMany({
    where: { ownershipEntity: { ownerId } },
    include: {
      ownerEquity: true,
      financials: true,
    },
  });

  const mortgages = await prisma.mortgageAsset.findMany({
    where: { ownerId },
    include: {
      performance: true,
    },
  });

  const score = computePortfolioScore(properties, mortgages);
  const valuation = computePortfolioValuation(properties);

  const equityChartData = properties.map((p) => ({
    label: `${p.address}, ${p.city}`,
    equity: p.ownerEquity?.equityAmount ?? 0,
    noi: p.financials?.noi ?? 0,
  }));

  const riskChartData = mortgages.map((m) => ({
    label: `Loan #${m.id}`,
    riskScore: m.performance?.riskScore ?? 0,
    ltv: m.performance?.ltv ?? 0,
  }));

  const riskMatrixData = riskChartData;

  // Diversification maps
  const byCityMap = new Map<string, number>();
  const byTypeMap = new Map<string, number>();

  properties.forEach((p) => {
    byCityMap.set(p.city, (byCityMap.get(p.city) ?? 0) + 1);
    byTypeMap.set(p.type, (byTypeMap.get(p.type) ?? 0) + 1);
  });

  const byCity = Array.from(byCityMap.entries()).map(([label, count]) => ({
    label,
    count,
  }));

  const byType = Array.from(byTypeMap.entries()).map(([label, count]) => ({
    label,
    count,
  }));

  // Diversification scores
  const cityScore = Math.min(100, byCityMap.size * 20);
  const typeScore = Math.min(100, byTypeMap.size * 20);

  return (
    <main className="px-6 md:px-12 lg:px-20 py-16 text-white bg-slate-900">
      <h1 className="text-4xl font-bold mb-6">Portfolio Intelligence</h1>

      {/* Top Scores */}
      <section className="grid md:grid-cols-4 gap-6 mb-10">
        <Kpi label="Overall Score" value={score.overallScore} />
        <Kpi label="Equity Score" value={score.equityScore} />
        <Kpi label="Cashflow Score" value={score.cashflowScore} />
        <Kpi label="Risk Score" value={score.riskScore} />
        <Kpi label="Diversification Score" value={score.diversificationScore} />
        <Kpi
          label="Total Value"
          value={`$${valuation.totalValue.toLocaleString()}`}
        />
        <Kpi
          label="Implied Cap Rate"
          value={`${valuation.impliedCapRate.toFixed(2)}%`}
        />
        <Kpi
          label="Implied NOI"
          value={`$${valuation.impliedNOI.toLocaleString()}`}
        />
      </section>

      {/* Charts */}
      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <PortfolioEquityChart data={equityChartData} />
        <PortfolioRiskChart data={riskChartData} />
      </section>

      {/* Risk Matrix */}
      <section className="mb-12">
        <PortfolioRiskMatrix data={riskMatrixData} />
      </section>

      {/* Diversification */}
      <section className="mb-12">
        <DiversificationSummary cityScore={cityScore} typeScore={typeScore} />
        <PortfolioDiversification byCity={byCity} byType={byType} />
      </section>
    </main>
  );
}

function Kpi({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-xl font-bold mt-2">{value}</p>
    </div>
  );
}
