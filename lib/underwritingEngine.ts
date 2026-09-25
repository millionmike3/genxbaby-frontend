import { computeAdvancedPortfolioScore } from "@/lib/advancedPortfolioScoring";
import { computeAdvancedPortfolioValuation } from "@/lib/portfolioValuation";

export async function evaluateAsset({ property, mortgage }) {
  // reuse your existing scoring + valuation
  const score = computeAdvancedPortfolioScore([property], mortgage ? [mortgage] : []);
  const valuation = computeAdvancedPortfolioValuation([property]);

  return { score, valuation };
}

export async function evaluatePortfolio({ properties, mortgages }) {
  const score = computeAdvancedPortfolioScore(properties, mortgages);
  const valuation = computeAdvancedPortfolioValuation(properties);
  return { score, valuation };
}
