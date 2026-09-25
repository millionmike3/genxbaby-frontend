import type { Property, MortgageAsset } from "@prisma/client";

export type AdvancedPortfolioScore = {
  overallScore: number;
  equityScore: number;
  cashflowScore: number;
  riskScore: number;
  diversificationScore: number;
  dscrScore: number;
};

export function computeAdvancedPortfolioScore(
  properties: (Property & {
    ownerEquity?: { equityAmount: number } | null;
    financials?: { noi: number; expenses: number } | null;
  })[],
  mortgages: (MortgageAsset & {
    performance?: { ltv: number; riskScore: number; dscr?: number | null } | null;
  })[]
): AdvancedPortfolioScore {
  const totalEquity = properties.reduce(
    (sum, p) => sum + (p.ownerEquity?.equityAmount ?? 0),
    0
  );

  const totalNOI = properties.reduce(
    (sum, p) => sum + (p.financials?.noi ?? 0),
    0
  );

  const totalExpenses = properties.reduce(
    (sum, p) => sum + (p.financials?.expenses ?? 0),
    0
  );

  const netCashflow = totalNOI - totalExpenses;

  const avgLTV =
    mortgages.length === 0
      ? 0
      : mortgages.reduce(
          (sum, m) => sum + (m.performance?.ltv ?? 0),
          0
        ) / mortgages.length;

  const avgRisk =
    mortgages.length === 0
      ? 0
      : mortgages.reduce(
          (sum, m) => sum + (m.performance?.riskScore ?? 0),
          0
        ) / mortgages.length;

  const avgDSCR =
    mortgages.length === 0
      ? 1
      : mortgages.reduce(
          (sum, m) => sum + (m.performance?.dscr ?? 1),
          0
        ) / mortgages.length;

  const equityScore = Math.min(100, totalEquity / 10000);
  const cashflowScore = Math.min(100, netCashflow / 1000);
  const riskScore = 100 - Math.min(100, avgRisk * 10 + avgLTV * 50);
  const dscrScore = Math.min(100, avgDSCR * 25);

  const diversificationScore = computeDiversificationScore(properties);

  const overallScore = Math.round(
    equityScore * 0.25 +
      cashflowScore * 0.25 +
      riskScore * 0.25 +
      dscrScore * 0.15 +
      diversificationScore * 0.10
  );

  return {
    overallScore,
    equityScore: Math.round(equityScore),
    cashflowScore: Math.round(cashflowScore),
    riskScore: Math.round(riskScore),
    diversificationScore: Math.round(diversificationScore),
    dscrScore: Math.round(dscrScore),
  };
}

function computeDiversificationScore(properties: Property[]): number {
  const byCity = new Map<string, number>();
  const byType = new Map<string, number>();

  properties.forEach((p) => {
    byCity.set(p.city, (byCity.get(p.city) ?? 0) + 1);
    byType.set(p.type, (byType.get(p.type) ?? 0) + 1);
  });

  const citySpread = byCity.size;
  const typeSpread = byType.size;

  return Math.min(100, (citySpread + typeSpread) * 10);
}
