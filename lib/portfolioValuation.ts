import type { Property } from "@prisma/client";

export type AdvancedValuationResult = {
  totalValue: number;
  impliedCapRate: number;
  impliedNOI: number;
  dcfValue: number;
  riskAdjustedValue: number;
};

export function computeAdvancedPortfolioValuation(
  properties: (Property & {
    financials?: { noi: number; expenses: number } | null;
  })[],
  discountRate = 0.08,
  years = 10,
  riskFactor = 0.0
): AdvancedValuationResult {
  const totalValue = properties.reduce(
    (sum, p) => sum + (p.currentValue ?? p.purchasePrice),
    0
  );

  const totalNOI = properties.reduce(
    (sum, p) => sum + (p.financials?.noi ?? 0),
    0
  );

  const impliedCapRate =
    totalValue === 0 ? 0 : (totalNOI / totalValue) * 100;

  // Simple DCF: assume flat NOI over N years
  let dcfValue = 0;
  for (let t = 1; t <= years; t++) {
    dcfValue += totalNOI / Math.pow(1 + discountRate, t);
  }

  const riskAdjustedValue = dcfValue * (1 - riskFactor);

  return {
    totalValue,
    impliedCapRate,
    impliedNOI: totalNOI,
    dcfValue,
    riskAdjustedValue,
  };
}
