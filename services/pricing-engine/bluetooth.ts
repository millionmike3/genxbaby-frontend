import { LoanPricingInput } from "./types";

export function getBluetoothAdjustment(input: LoanPricingInput, notes: string[]) {
  if (!input.bluetoothPresent) return 0;

  const adj = 0.05;
  notes.push(`Bluetooth presence adjustment: +${adj}`);
  return adj;
}
