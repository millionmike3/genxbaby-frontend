import { computeAdvancedPortfolioScore } from "@/lib/advancedPortfolioScoring";
import { computePortfolioValuation } from "@/lib/portfolioValuation";
import { Application, UnderwritingCase } from "@prisma/client";

/* -------------------------------------------------------
   Portfolio / Asset Evaluation (your existing logic)
-------------------------------------------------------- */

export async function evaluateAsset({ property, mortgage }) {
  const score = computeAdvancedPortfolioScore(
    [property],
    mortgage ? [mortgage] : []
  );

  const valuation = computePortfolioValuation([property]);

  return { score, valuation };
}

export async function evaluatePortfolio({ properties, mortgages }) {
  const score = computeAdvancedPortfolioScore(properties, mortgages);
  const valuation = computePortfolioValuation(properties);
  return { score, valuation };
}

/* -------------------------------------------------------
   AUS-Style Underwriting Engine (new logic)
-------------------------------------------------------- */

export type UWResult = {
  ausFinding: string;
  decision: string;
  conditions: string[];
};

export function runUnderwritingEngine(
  app: Application & {
    underwritingCase?: UnderwritingCase | null;
  }
): UWResult {
  const income = app.incomeMonthly ?? 0;
  const debts = app.debtsMonthly ?? 0;
  const loanAmount = app.loanAmount ?? 0;
  const propertyValue = app.propertyValue ?? 0;

  const dti = income > 0 ? (debts / income) * 100 : null;
  const ltv = propertyValue > 0 ? (loanAmount / propertyValue) * 100 : null;

  const fraudScore = app.underwritingCase?.fraudScore ?? null;
  const riskScore = app.underwritingCase?.riskScore ?? null;
  const routingScore = app.underwritingCase?.routingScore ?? null;

  const conditions: string[] = [];

  /* -------------------------------------------------------
     AUS-style decision logic
  -------------------------------------------------------- */

  let ausFinding = "Insufficient Data";
  let decision = "REFER";

  if (dti != null && ltv != null) {
    if (dti < 43 && ltv <= 90) {
      ausFinding = "Approve/Eligible";
      decision = "APPROVE";
    } else if (dti < 50 && ltv <= 95) {
      ausFinding = "Refer/Eligible";
      decision = "REFER";
      conditions.push(
        "Provide compensating factors (reserves, strong credit, stable income)."
      );
    } else {
      ausFinding = "Refer with Caution";
      decision = "REFER";
      conditions.push("Underwriter review required due to high DTI/LTV.");
    }
  }

  /* -------------------------------------------------------
     Fraud / Risk Overlays
  -------------------------------------------------------- */

  if (fraudScore && fraudScore >= 600) {
    conditions.push("Enhanced fraud review required.");
    if (decision === "APPROVE") {
      decision = "REFER";
      ausFinding = "Refer/Eligible";
    }
  }

  if (riskScore && riskScore >= 600) {
    conditions.push("High risk score – consider overlays or counteroffer.");
  }

  if (routingScore && routingScore >= 600) {
    conditions.push("Routing score indicates specialty channel review.");
  }

  /* -------------------------------------------------------
     Additional overlays
  -------------------------------------------------------- */

  if (ltv && ltv > 95) {
    conditions.push("LTV > 95% – verify product eligibility and MI requirements.");
  }

  if (dti && dti > 50) {
    conditions.push("DTI > 50% – consider debt paydown or income verification.");
  }

  /* -------------------------------------------------------
     Default condition set
  -------------------------------------------------------- */

  if (!conditions.length) {
    conditions.push("No additional conditions – standard documentation applies.");
  }

  return {
    ausFinding,
    decision,
    conditions,
  };
}
