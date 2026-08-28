// -----------------------------
// Fraud Severity Union
// -----------------------------
export type FraudSeverity = "critical" | "warning" | "info";

// -----------------------------
// Fraud Flag Interface
// -----------------------------
export interface FraudFlag {
  id: string;
  createdAt: Date | string;
  reason: string;
  message: string;
  severity: string; // Prisma returns string
  checkId: string;
  resolved: boolean;
}

// -----------------------------
// Fraud Score Calculation
// -----------------------------
export function getFraudScore(flags: FraudFlag[]): number {
  const weights: Record<FraudSeverity, number> = {
    critical: 100,
    warning: 50,
    info: 10,
  };

  return flags
    .filter((f) => !f.resolved)
    .reduce((score, flag) => {
      const sev = flag.severity as FraudSeverity;

      // If severity is unknown, treat as "info"
      const weight = weights[sev] ?? weights["info"];

      return score + weight;
    }, 0);
}

// -----------------------------
// Fraud Risk Label
// -----------------------------
export function getFraudRiskLabel(score: number): "Low" | "Medium" | "High" {
  if (score >= 150) return "High";
  if (score >= 50) return "Medium";
  return "Low";
}
