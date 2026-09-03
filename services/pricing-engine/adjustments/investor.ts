import { LoanPricingInput } from "../types";

export function getInvestorTierAdjustment(input: LoanPricingInput, notes: string[]): number {
  const tier = input.investorTier ?? "B";

  const tierAdjMap: Record<string, number> = {
    A: -0.125,
    B: 0.0,
    C: 0.125,
    D: 0.25,
  };

  const adj = tierAdjMap[tier] ?? 0;

  if (adj !== 0) {
    notes.push(`Investor tier ${tier} → ${adj >= 0 ? "+" : ""}${adj.toFixed(3)}% rate adj`);
  }

  return adj;
}
