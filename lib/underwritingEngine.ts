import { computeAdvancedPortfolioScore } from "@/lib/advancedPortfolioScoring";
import { computePortfolioValuation
 } from "@/lib/portfolioValuation";

export async function evaluateAsset({ property, mortgage }) {
  // reuse your existing scoring + valuation
  const score = computeAdvancedPortfolioScore([property], mortgage ? [mortgage] : []);
  const valuation = computePortfolioValuation
([property]);

  return { score, valuation };
}

export async function evaluatePortfolio({ properties, mortgages }) {
  const score = computeAdvancedPortfolioScore(properties, mortgages);
  const valuation = computePortfolioValuation(properties);
  return { score, valuation };
}
