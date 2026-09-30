export type XAIExplanation = {
  reasons: string[];
  featureContributions: { feature: string; impact: number }[];
};

export function xaiExplain(input: AURInput): XAIExplanation {
  const reasons: string[] = [];
  const featureContributions: XAIExplanation["featureContributions"] = [];

  if (input.fraudScore > 80) {
    reasons.push("Fraud score is elevated due to pattern anomalies.");
    featureContributions.push({ feature: "fraudScore", impact: 0.35 });
  }

  if (input.riskScore > 75) {
    reasons.push("Risk score is high relative to portfolio baseline.");
    featureContributions.push({ feature: "riskScore", impact: 0.3 });
  }

  if (input.impulsivenessScore > 70) {
    reasons.push("Borrower shows unstable behavioral trajectory.");
    featureContributions.push({ feature: "impulsivenessScore", impact: 0.2 });
  }

  if (input.ltv > 90) {
    reasons.push("Loan‑to‑value exceeds conservative threshold.");
    featureContributions.push({ feature: "ltv", impact: 0.1 });
  }

  if (input.dti > 45) {
    reasons.push("Debt‑to‑income ratio is above target range.");
    featureContributions.push({ feature: "dti", impact: 0.1 });
  }

  return { reasons, featureContributions };
}
