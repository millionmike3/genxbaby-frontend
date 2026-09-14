import { PricingDAL } from "@/lib/dal/pricing";

export async function runPricing(app: any, underwriting: any, scoring: any, fraud: any) {
  await PricingDAL.addTimelineEvent(app.id, "Pricing started");

  const baseRate = computeBaseRate(app);
  await PricingDAL.addTimelineEvent(app.id, "Base rate calculated");

  const llpa = underwriting.llpa ?? 0;
  await PricingDAL.addTimelineEvent(app.id, "LLPA applied");

  const riskAdj = computeRiskAdjustments(scoring);
  await PricingDAL.addTimelineEvent(app.id, "Risk adjustments applied");

  const fraudAdj = computeFraudAdjustments(fraud);
  await PricingDAL.addTimelineEvent(app.id, "Fraud adjustments applied");

  const finalRate = Number((baseRate + llpa + riskAdj + fraudAdj).toFixed(3));
  await PricingDAL.addTimelineEvent(app.id, "Final rate calculated");

  const rationale = generateRationale(baseRate, llpa, riskAdj, fraudAdj);

  const result = {
    baseRate,
    llpa,
    riskAdjustments: riskAdj,
    fraudAdjustments: fraudAdj,
    finalRate,
    rationale,
  };

  await PricingDAL.save(app.id, result);

  return result;
}

function computeBaseRate(app: any) {
  let rate = 6.5; // baseline

  if (app.creditScore >= 740) rate -= 0.25;
  if (app.creditScore < 640) rate += 0.50;

  if (app.loanAmount > 750000) rate += 0.125;

  return Number(rate.toFixed(3));
}

function computeRiskAdjustments(scoring: any) {
  let adj = 0;

  if (scoring.riskScore > 70) adj += 0.375;
  if (scoring.impulsivenessScore > 60) adj += 0.250;

  return Number(adj.toFixed(3));
}

function computeFraudAdjustments(fraud: any) {
  let adj = 0;

  if (fraud.fraudScore > 50) adj += 0.500;
  if (fraud.fraudScore > 80) adj += 1.000;

  return Number(adj.toFixed(3));
}

function generateRationale(baseRate: number, llpa: number, riskAdj: number, fraudAdj: number) {
  return [
    `Base rate: ${baseRate}%`,
    `LLPA: ${llpa}%`,
    `Risk adjustments: ${riskAdj}%`,
    `Fraud adjustments: ${fraudAdj}%`,
    `Final rate: ${(baseRate + llpa + riskAdj + fraudAdj).toFixed(3)}%`,
  ];
}
