export type UPIMetricBundle = {
  underwriterId: string;

  // Base metrics
  avgDecisionTimeMs: number;
  decisionCount: number;

  // Accuracy
  accuracy: number;

  // Bias
  ficoBias: number;
  incomeBias: number;
  propertyBias: number;

  // Risk alignment
  riskAlignment: number;
  riskMisalignment: number;
  riskCritical: number;

  // Fraud alignment
  fraudAlignment: number;
  fraudMisalignment: number;
  fraudCritical: number;
};

export type UPIScore = {
  underwriterId: string;
  score: number;
};

export function computeUPIScore(metrics: UPIMetricBundle[]): UPIScore[] {
  return metrics.map((m) => {
    // Normalize components to 0–100 scale
    const speedScore = normalizeSpeed(m.avgDecisionTimeMs);
    const volumeScore = normalizeVolume(m.decisionCount);
    const accuracyScore = m.accuracy; // already 0–100
    const biasScore = normalizeBias(m.ficoBias + m.incomeBias + m.propertyBias);
    const riskScore = normalizeAlignment(m.riskAlignment, m.riskCritical);
    const fraudScore = normalizeAlignment(m.fraudAlignment, m.fraudCritical);

    // Weighted scoring model
    const finalScore =
      speedScore * 0.15 +
      volumeScore * 0.10 +
      accuracyScore * 0.25 +
      (100 - biasScore) * 0.10 +
      riskScore * 0.20 +
      fraudScore * 0.20;

    return {
      underwriterId: m.underwriterId,
      score: Math.round(finalScore),
    };
  });
}

function normalizeSpeed(ms: number): number {
  if (ms <= 2000) return 100;
  if (ms >= 15000) return 0;
  return 100 - (ms - 2000) / 130;
}

function normalizeVolume(count: number): number {
  if (count >= 50) return 100;
  if (count <= 5) return 10;
  return (count / 50) * 100;
}

function normalizeBias(bias: number): number {
  if (bias <= 5) return 10;
  if (bias >= 40) return 100;
  return (bias / 40) * 100;
}

function normalizeAlignment(aligned: number, critical: number): number {
  const base = aligned - critical * 2;
  return Math.max(0, Math.min(100, base));
}
