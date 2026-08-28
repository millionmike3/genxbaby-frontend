import { FraudSeverity } from "./fraudScoring";

export function classifySeverityFromReason(reason: string): FraudSeverity {
  const r = reason.toLowerCase();

  if (
    r.includes("stolen") ||
    r.includes("forged") ||
    r.includes("account takeover") ||
    r.includes("duplicate") ||
    r.includes("closed account")
  ) {
    return "critical";
  }

  if (
    r.includes("mismatch") ||
    r.includes("unverified") ||
    r.includes("high amount")
  ) {
    return "warning";
  }

  return "info";
}
