export type AnomalyRecord = {
  underwriterId: string;
  riskScore: number;
  fraudScore: number;
  decision: string;
  bias: number;
  speed: number;
  createdAt: Date;
};

export type AnomalyMetric = {
  underwriterId: string;
  riskAnomaly: number;
  fraudAnomaly: number;
  decisionAnomaly: number;
  biasAnomaly: number;
  speedAnomaly: number;
  totalAnomalyScore: number;
};

export function computeUPIAnomalies(records: AnomalyRecord[]): AnomalyMetric[] {
  const grouped: Record<string, AnomalyRecord[]> = {};

  for (const r of records) {
    if (!grouped[r.underwriterId]) grouped[r.underwriterId] = [];
    grouped[r.underwriterId].push(r);
  }

  return Object.entries(grouped).map(([underwriterId, recs]) => {
    const riskAnomaly = zScore(recs.map((r) => r.riskScore));
    const fraudAnomaly = zScore(recs.map((r) => r.fraudScore));
    const decisionAnomaly = zScore(recs.map((r) => decisionValue(r.decision)));
    const biasAnomaly = zScore(recs.map((r) => r.bias));
    const speedAnomaly = zScore(recs.map((r) => r.speed));

    const totalAnomalyScore =
      riskAnomaly +
      fraudAnomaly +
      decisionAnomaly +
      biasAnomaly +
      speedAnomaly;

    return {
      underwriterId,
      riskAnomaly,
      fraudAnomaly,
      decisionAnomaly,
      biasAnomaly,
      speedAnomaly,
      totalAnomalyScore,
    };
  });
}

function zScore(values: number[]): number {
  if (values.length < 2) return 0;

  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance =
    values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) /
    values.length;
  const std = Math.sqrt(variance);

  if (std === 0) return 0;

  const last = values[values.length - 1];
  return (last - mean) / std;
}

function decisionValue(decision: string): number {
  switch (decision) {
    case "approved":
      return 1;
    case "conditions":
      return 0.5;
    case "returned":
      return 0.2;
    case "denied":
      return 0;
    default:
      return 0.3;
  }
}
