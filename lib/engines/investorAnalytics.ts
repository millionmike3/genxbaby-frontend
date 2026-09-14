export function computeInvestorAnalytics(portfolio: any[]) {
  const total = portfolio.length;

  const riskScores = portfolio.map((p) => p.scoring?.[0]?.riskScore ?? 0);
  const fraudScores = portfolio.map((p) => p.fraud?.[0]?.fraudScore ?? 0);
  const impulsivenessScores = portfolio.map((p) => p.scoring?.[0]?.impulsivenessScore ?? 0);

  const avgRisk = average(riskScores);
  const avgFraud = average(fraudScores);
  const avgImp = average(impulsivenessScores);

  const funded = portfolio.filter((p) => p.servicing?.status === "funded").length;
  const conversionRate = total === 0 ? 0 : Math.round((funded / total) * 100);

  const forecast = computeForecast(portfolio);

  return {
    totalApplications: total,
    conversionRate,
    avgRisk,
    avgFraud,
    avgImpulsiveness: avgImp,
    forecast,
    riskDistribution: distribution(riskScores),
    fraudDistribution: distribution(fraudScores),
    impulsivenessDistribution: distribution(impulsivenessScores),
  };
}

function average(arr: number[]) {
  if (arr.length === 0) return 0;
  return Number((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2));
}

function distribution(arr: number[]) {
  return {
    low: arr.filter((x) => x < 40).length,
    medium: arr.filter((x) => x >= 40 && x < 70).length,
    high: arr.filter((x) => x >= 70).length,
  };
}

function computeForecast(portfolio: any[]) {
  let expectedReturn = 0;

  for (const p of portfolio) {
    const rate = p.pricing?.finalRate ?? 0;
    const amount = p.loanAmount ?? 0;

    expectedReturn += (rate / 100) * amount * 0.01; // simplified model
  }

  return Number(expectedReturn.toFixed(2));
}
