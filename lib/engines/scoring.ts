import { ScoringDAL } from "@/lib/dal/scoring";

export async function runScoring(app: any, borrower: any, environment: any) {
  await ScoringDAL.addTimelineEvent(app.id, "Scoring started");

  const behavior = computeBehaviorProfile(borrower);
  await ScoringDAL.addTimelineEvent(app.id, "Behavior metrics collected");

  const riskScore = computeRiskScore(app, behavior);
  await ScoringDAL.addTimelineEvent(app.id, "Risk score calculated");

  const fraudScore = computeFraudScore(environment, behavior);
  await ScoringDAL.addTimelineEvent(app.id, "Fraud score calculated");

  const impulsivenessScore = computeImpulsivenessScore(behavior);
  await ScoringDAL.addTimelineEvent(app.id, "Impulsiveness score calculated");

  const result = {
    riskScore,
    fraudScore,
    impulsivenessScore,
    behavior,
  };

  await ScoringDAL.save(app.id, result);

  return result;
}

function computeBehaviorProfile(borrower: any) {
  return {
    emailAge: borrower.emailAge ?? 0,
    phoneAge: borrower.phoneAge ?? 0,
    employerStability: borrower.employerStability ?? 0,
    incomeVolatility: borrower.incomeVolatility ?? 0,
    appSpeed: borrower.appSpeed ?? 0,
  };
}

function computeRiskScore(app: any, behavior: any) {
  let score = 0;

  if (app.creditScore < 620) score += 20;
  if (app.dti > 45) score += 15;

  score += behavior.incomeVolatility * 0.5;
  score += behavior.appSpeed * 0.3;

  return Math.min(100, Math.round(score));
}

function computeFraudScore(environment: any, behavior: any) {
  let score = 0;

  score += environment.riskScore * 0.5;
  score += behavior.emailAge < 1 ? 10 : 0;
  score += behavior.phoneAge < 1 ? 10 : 0;

  return Math.min(100, Math.round(score));
}

function computeImpulsivenessScore(behavior: any) {
  let score = 0;

  score += behavior.appSpeed * 1.5;
  score += behavior.incomeVolatility * 0.7;

  return Math.min(100, Math.round(score));
}
