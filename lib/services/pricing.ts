import { prisma } from "@/lib/prisma";

export async function applyInvestorPricing(applicationId: string) {
  const app = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { underwritingCase: true },
  });

  if (!app || !app.underwritingCase) {
    throw new Error("Missing underwriting case");
  }

  const uw = app.underwritingCase;

  const investor = await prisma.investor.findUnique({
    where: { id: app.investorId },
    include: { overlays: true },
  });

  if (!investor || investor.overlays.length === 0) {
    return { decision: "refer", price: null, reasons: ["No investor overlays"] };
  }

  const overlay = investor.overlays[0];
  let reasons: string[] = [];
  let decision: "approved" | "declined" | "refer" = "approved";

  // Apply overlays
  if (overlay.maxDTI && uw.dti > overlay.maxDTI) {
    decision = "declined";
    reasons.push(`DTI exceeds investor limit (${uw.dti.toFixed(1)}%)`);
  }

  if (overlay.maxLTV && uw.ltv > overlay.maxLTV) {
    decision = "declined";
    reasons.push(`LTV exceeds investor limit (${uw.ltv.toFixed(1)}%)`);
  }

  if (overlay.maxCLTV && uw.cltv > overlay.maxCLTV) {
    decision = "declined";
    reasons.push(`CLTV exceeds investor limit (${uw.cltv.toFixed(1)}%)`);
  }

  if (overlay.minReserves && uw.reservesMonths < overlay.minReserves) {
    decision = decision === "declined" ? "declined" : "refer";
    reasons.push(`Reserves below investor minimum (${uw.reservesMonths.toFixed(1)} months)`);
  }

  if (overlay.minRiskScore && uw.riskScore < overlay.minRiskScore) {
    decision = "declined";
    reasons.push(`Risk score below investor minimum (${uw.riskScore})`);
  }

  if (overlay.maxFraudScore && uw.fraudScore > overlay.maxFraudScore) {
    decision = "declined";
    reasons.push(`Fraud score exceeds investor limit (${uw.fraudScore})`);
  }

  // Pricing (LLPA)
  let baseRate = app.noteRate ?? 6.5;
  let llpa = 0;

  if (overlay.llpaJson) {
    if (uw.ltv > 95) llpa += overlay.llpaJson.highLTV ?? 0.25;
    if (uw.riskScore < 600) llpa += overlay.llpaJson.lowCredit ?? 0.375;
    if (uw.dti > 45) llpa += overlay.llpaJson.highDTI ?? 0.125;
  }

  const finalRate = baseRate + llpa;

  await prisma.underwritingCase.update({
    where: { id: uw.id },
    data: {
      investorDecision: decision,
      investorReasons: reasons,
      finalRate,
      llpa,
    },
  });

  return { decision, reasons, finalRate, llpa };
}
