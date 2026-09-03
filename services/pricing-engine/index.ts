import { getBehaviorAdjustment } from "./adjustments/behavior";
import { getBluetoothAdjustment } from "./adjustments/bluetooth";
import { getInvestorTierAdjustment } from "./adjustments/investor";
import { correlatePricingBehavior } from "@/services/analytics-engine/correlation";
import { getLlpaAdjustment } from "./llpa";

import { LoanPricingInput } from "./types";

export type PricingBreakdown = {
  baseRate: number;
  llpaAdj: number;
  behaviorAdj: number;
  bluetoothAdj: number;
  investorAdj: number;
  finalRate: number;
  notes: string[];
};

export async function priceLoan(input: LoanPricingInput): Promise<PricingBreakdown> {
  const notes: string[] = [];

  const baseRate = getBaseRate(input);
  notes.push(`Base rate for ${input.loanType} ${input.termMonths} months: ${baseRate.toFixed(3)}`);

  const llpaAdj = getLlpaAdjustment(input, notes);
  const behaviorAdj = getBehaviorAdjustment(input, notes);
  const bluetoothAdj = getBluetoothAdjustment(input, notes);
  const investorAdj = getInvestorTierAdjustment(input, notes);

  // ⭐⭐⭐ EXACT PLACEMENT OF YOUR NEW BLOCK ⭐⭐⭐
  let volatilityAdj = 0;

  if (input.userId) {
    const correlation = await correlatePricingBehavior(input.userId);

    if (correlation.pricingVolatility > 70) {
      notes.push("High pricing volatility → +0.125% rate adj");
      volatilityAdj = 0.125;
    }
  }
  // ⭐⭐⭐ END OF NEW BLOCK ⭐⭐⭐

  const finalRate =
    baseRate +
    llpaAdj +
    behaviorAdj +
    bluetoothAdj +
    investorAdj +
    volatilityAdj;

  notes.push(`Final rate: ${finalRate.toFixed(3)}`);

  return {
    baseRate,
    llpaAdj,
    behaviorAdj,
    bluetoothAdj,
    investorAdj,
    finalRate,
    notes,
  };
}

function getBaseRate(input: LoanPricingInput): number {
  const { loanType, termMonths } = input;

  if (loanType === "conv") {
    return termMonths === 360 ? 6.75 : 6.50;
  }

  if (loanType === "fha") {
    return termMonths === 360 ? 6.50 : 6.25;
  }

  if (loanType === "va") {
    return termMonths === 360 ? 6.40 : 6.20;
  }

  // non-QM base is higher
  return termMonths === 360 ? 8.25 : 7.75;
}
