import { LoanPricingInput } from "./types";

type LlpaGridKey = `${number}-${number}-${string}-${string}-${string}`;
// e.g. "700-80-owner-SFR-purchase"

const LLPA_GRID: Record<LlpaGridKey, number> = {
  "700-80-owner-SFR-purchase": 0.25,
  "660-90-owner-SFR-purchase": 0.75,
  "620-95-owner-SFR-purchase": 1.50,
  // expand as needed
};

const STATE_OVERLAYS: Record<string, number> = {
  CA: 0.125,
  NY: 0.150,
  FL: 0.100,
};

export function getLlpaAdjustment(input: LoanPricingInput, notes: string[]): number {
  const ficoBucket = bucketFico(input.fico);
  const ltvBucket = bucketLtv(input.ltv);

  const key: LlpaGridKey = `${ficoBucket}-${ltvBucket}-${input.occupancy}-${input.propertyType}-${input.purpose}`;

  let adj = LLPA_GRID[key] ?? 0;

  if (adj !== 0) {
    notes.push(`LLPA grid hit: ${key} → ${adj.toFixed(3)}`);
  }

  if (input.state && STATE_OVERLAYS[input.state]) {
    const overlay = STATE_OVERLAYS[input.state];
    adj += overlay;
    notes.push(`State overlay for ${input.state}: ${overlay.toFixed(3)}`);
  }

  return adj; // keep as raw rate adjustment
}

function bucketFico(fico: number): number {
  if (fico >= 760) return 760;
  if (fico >= 740) return 740;
  if (fico >= 720) return 720;
  if (fico >= 700) return 700;
  if (fico >= 680) return 680;
  if (fico >= 660) return 660;
  if (fico >= 640) return 640;
  return 620;
}

function bucketLtv(ltv: number): number {
  if (ltv <= 60) return 60;
  if (ltv <= 70) return 70;
  if (ltv <= 75) return 75;
  if (ltv <= 80) return 80;
  if (ltv <= 85) return 85;
  if (ltv <= 90) return 90;
  return 95;
}
