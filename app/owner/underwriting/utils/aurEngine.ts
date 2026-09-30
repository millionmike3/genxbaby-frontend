export type AURInput = {
  fraudScore: number;
  riskScore: number;
  impulsivenessScore: number;
  propertyValue: number;
  ltv: number;
  dti: number;
  income: number;
  liabilities: number;
  declarationsFlags: string[];
};

export type AURRecommendation = {
  decision: "approve" | "deny" | "conditions";
  conditions: string[];
  riskFlags: string[];
  fraudFlags: string[];
  behavioralFlags: string[];
  rationale: string;
};

export function aurEngine(input: AURInput): AURRecommendation {
  // rule + score hybrid
  // example skeleton:
  const riskFlags: string[] = [];
  const fraudFlags: string[] = [];
  const behavioralFlags: string[] = [];
  const conditions: string[] = [];

  if (input.fraudScore > 80) fraudFlags.push("High fraud score");
  if (input.riskScore > 75) riskFlags.push("High portfolio risk");
  if (input.impulsivenessScore > 70) behavioralFlags.push("Impulsive behavior pattern");

  if (input.ltv > 90) conditions.push("Reduce LTV below 90%");
  if (input.dti > 45) conditions.push("Reduce DTI below 45%");

  let decision: AURRecommendation["decision"] = "approve";

  if (fraudFlags.length || riskFlags.length > 1) {
    decision = "conditions";
  }
  if (input.fraudScore > 90 || input.riskScore > 90) {
    decision = "deny";
  }

  return {
    decision,
    conditions,
    riskFlags,
    fraudFlags,
    behavioralFlags,
    rationale: "Decision based on fraud, risk, behavioral, LTV, and DTI thresholds.",
  };
}
