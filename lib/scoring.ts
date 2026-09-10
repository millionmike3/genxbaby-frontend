import { keccak256 } from "js-sha3";

/**
 * Normalize any numeric input into a safe 0–1 range.
 */
export function normalizeInput(value: number): number {
  if (!value || isNaN(value)) return 0;
  return Math.max(0, Math.min(1, value / 100));
}

/**
 * Risk scoring model (0–850)
 */
export function scoreRisk(input: any): number {
  const income = normalizeInput(input.incomeMonthly);
  const debts = normalizeInput(input.debtsMonthly);
  const dti = debts / (income || 1);

  const credit = normalizeInput(input.creditScore);
  const stability = normalizeInput(input.stabilityScore);

  const raw =
    credit * 0.55 +
    stability * 0.25 +
    (1 - dti) * 0.20;

  return Math.round(raw * 850);
}

/**
 * Fraud scoring model (0–100)
 */
export function scoreFraud(input: any): number {
  let score = 0;

  if (input.nameMismatch) score += 25;
  if (input.addressMismatch) score += 25;
  if (input.incomeMismatch) score += 25;
  if (input.bankMismatch) score += 25;

  return score;
}

/**
 * Impulsiveness scoring model (0–100)
 */
export function scoreImpulsiveness(input: any): number {
  let score = 0;

  if (input.fastClicking) score += 20;
  if (input.formCorrections > 3) score += 20;
  if (input.sessionJumps > 5) score += 20;
  if (input.timeOnPage < 3) score += 20;
  if (input.deviceChanges > 1) score += 20;

  return score;
}

/**
 * Investor behavioral scoring model (0–100)
 */
export function scoreInvestor(input: any): number {
  let score = 0;

  if (input.diversification < 3) score += 20;
  if (input.highRiskPositions > 50) score += 20;
  if (input.tradeFrequency > 20) score += 20;
  if (input.leverageUsed) score += 20;
  if (input.cryptoExposure > 30) score += 20;

  return score;
}

/**
 * Customer scoring model (0–100)
 */
export function scoreCustomer(input: any): number {
  let score = 0;

  if (input.latePayments > 0) score += 25;
  if (input.disputes > 0) score += 25;
  if (input.chargebacks > 0) score += 25;
  if (input.accountFlags > 0) score += 25;

  return score;
}

/**
 * Stock sanitizer scoring model (0–100)
 */
export function scoreStockSanitizer(input: any): number {
  let score = 0;

  if (input.pennyStocks > 0) score += 25;
  if (input.unverifiedIssuers > 0) score += 25;
  if (input.lowLiquidity > 0) score += 25;
  if (input.highVolatility > 0) score += 25;

  return score;
}

/**
 * Classify score into a band
 */
export function classify(score: number, type: "RISK" | "INVESTOR" | "FRAUD" = "RISK") {
  if (type === "RISK") {
    if (score >= 760) return "Excellent";
    if (score >= 700) return "Good";
    if (score >= 640) return "Fair";
    return "Poor";
  }

  if (type === "INVESTOR") {
    if (score <= 20) return "Stable";
    if (score <= 40) return "Moderate";
    if (score <= 60) return "Aggressive";
    return "Highly Impulsive";
  }

  if (type === "FRAUD") {
    if (score <= 20) return "Low";
    if (score <= 50) return "Medium";
    if (score <= 80) return "High";
    return "Critical";
  }

  return "Unknown";
}

/**
 * Hash any scoring payload for audit trails
 */
export function hashPayload(payload: any): string {
  return keccak256(JSON.stringify(payload));
}
