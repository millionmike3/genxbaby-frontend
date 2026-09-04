import { LoanPricingInput } from "./types";

export function getBehaviorAdjustment(input: LoanPricingInput, notes: string[]) {
  if (!input.impulsivenessScore) return 0;

  const adj = +(input.impulsivenessScore * 0.01).toFixed(3);
  notes.push(`Behavior adjustment: +${adj}`);
  return adj;
}
