import { LoanPricingInput, PricingBreakdown } from "./types";
import { getLlpaAdjustment } from "./llpa";
import { getGovAdjustment } from "./fha-va";
import { getNonQmAdjustment } from "./nonqm";
import { getInvestorTierAdjustment } from "./investor-sheet";
import { getBehaviorAdjustment } from "./behavior";
import { getBluetoothAdjustment } from "./bluetooth";

// Example base rate function (you can replace this with your own logic)
function getBaseRate(input: LoanPricingInput): number {
  return 6.500; // placeholder base rate
}

export async function priceLoan(input: LoanPricingInput): Promise<PricingBreakdown> {
  const notes: string[] = [];

  // 1. Base rate
  const baseRate = getBaseRate(input);
  notes.push(`Base rate: ${baseRate.toFixed(3)}`);

  let rate = baseRate;

  // 2. FHA / VA overlays
  const govAdj = await getGovAdjustment(input, notes);
  rate += govAdj;

  // 3. Non-QM adjustments
  const nonQmAdj = await getNonQmAdjustment(input, notes);
  rate += nonQmAdj;

  // 4. LLPA
  const llpaAdj = getLlpaAdjustment(input, notes);
  rate += llpaAdj;

  // 5. Behavior adjustment
  const behaviorAdj = getBehaviorAdjustment(input, notes);
  rate += behaviorAdj;

  // 6. Bluetooth adjustment
  const bluetoothAdj = getBluetoothAdjustment(input, notes);
  rate += bluetoothAdj;

  // 7. Investor tier adjustment
 const investorAdj = await getInvestorTierAdjustment(input, llpaAdj, notes);

  rate += investorAdj;

  // Final rate
  notes.push(`Final rate: ${rate.toFixed(3)}`);

  return {
    baseRate,
    govAdj,
    nonQmAdj,
    llpaAdj,
    behaviorAdj,
    bluetoothAdj,
    investorAdj,
    finalRate: rate,
    notes,
  };
}
