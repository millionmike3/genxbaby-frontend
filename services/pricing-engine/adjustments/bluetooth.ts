import { LoanPricingInput } from "../types";

export function getBluetoothAdjustment(input: LoanPricingInput, notes: string[]): number {
  if (!input.bluetoothPresent) return 0;

  const risk = input.bluetoothRiskScore ?? 0;

  if (risk >= 80) {
    notes.push(`Bluetooth high-risk proximity (${risk}) → +0.250% rate adj`);
    return 0.25;
  }

  if (risk >= 50) {
    notes.push(`Bluetooth moderate-risk proximity (${risk}) → +0.125% rate adj`);
    return 0.125;
  }

  notes.push(`Bluetooth present but low risk (${risk}) → +0.050% rate adj`);
  return 0.05;
}
