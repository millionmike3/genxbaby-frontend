import { LoanPricingInput } from "../types";

export function getBehaviorAdjustment(input: LoanPricingInput, notes: string[]): number {
  const score = input.impulsivenessScore ?? 0;

  if (score <= 0) return 0;

  if (score > 80) {
    notes.push(`High impulsiveness (${score}) → +0.375% rate adj`);
    return 0.375;
  }

  if (score > 60) {
    notes.push(`Moderate impulsiveness (${score}) → +0.250% rate adj`);
    return 0.25;
  }

  if (score > 40) {
    notes.push(`Mild impulsiveness (${score}) → +0.125% rate adj`);
    return 0.125;
  }

  return 0;
}
