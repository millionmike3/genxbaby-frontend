import { UnderwritingDAL } from "@/lib/dal/underwriting";

export async function runUnderwriting(app: any, scoring: any, fraud: any) {
  const llpa = computeLLPA(app, scoring);
  const riskFactors = computeRiskFactors(app, scoring, fraud);
  const decision = computeDecision(llpa, scoring, fraud);
  const rationale = generateRationale(llpa, riskFactors, scoring, fraud);

  const result = {
    llpa,
    riskFactors,
    decision,
    rationale,
  };

  await UnderwritingDAL.save(app.id, result);
  await UnderwritingDAL.addTimelineEvent(app.id, "Underwriting decision generated");

  return result;
}

function computeLLPA(app: any, scoring: any) {
  let llpa = 0;

  if (app.creditScore < 640) llpa += 1.25;
  if (app.creditScore < 580) llpa += 2.00;

  if (scoring.riskScore > 70) llpa += 0.75;
  if (scoring.impulsivenessScore > 60) llpa += 0.50;

  return Number(llpa.toFixed(2));
}

function computeRiskFactors(app: any, scoring: any, fraud: any) {
  const factors = [];

  if (app.creditScore < 620) factors.push("Low credit score");
  if (app.dti > 45) factors.push("High DTI");
  if (scoring.riskScore > 70) factors.push("High behavioral risk");
  if (fraud.fraudScore > 50) factors.push("Fraud indicators present");

  return factors;
}

function computeDecision(llpa: number, scoring: any, fraud: any) {
  if (fraud.fraudScore > 80) return "Deny";
  if (scoring.riskScore > 80) return "Refer";
  if (llpa > 2.5) return "Refer";

  return "Approve";
}

function generateRationale(llpa: number, factors: string[], scoring: any, fraud: any) {
  const rationale = [];

  rationale.push(`LLPA calculated at ${llpa}%`);
  rationale.push(`Risk factors: ${factors.join(", ") || "None"}`);
  rationale.push(`Risk score: ${scoring.riskScore}`);
  rationale.push(`Fraud score: ${fraud.fraudScore}`);

  return rationale;
}
