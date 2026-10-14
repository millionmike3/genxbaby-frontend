import { FraudScanResult } from "../fraud/types";

export function classifyDocument(buffer: Buffer): FraudScanResult {
  // Basic placeholder classifier — replace with your real logic
  return {
    score: 0,
    flags: [],
    metadata: {
      size: buffer.length,
      type: "unknown",
    },
  };
}
