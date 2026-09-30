export type DriftRecord = {
  underwriterId: string;
  decision: string;
  riskScore: number;
  fraudScore: number;
  fico: number | null;
  income: number | null;
  propertyType: string | null;
  decisionTimeMs: number;
  createdAt: Date;
};

export type DriftMetric = {
  underwriterId: string;
  riskDrift: number;
  fraudDrift: number;
  decisionDrift: number;
  speedDrift: number;
  biasDrift: number;
};

export function computeUPIDrift(records: DriftRecord[]): DriftMetric[] {
  const grouped: Record<string, DriftRecord[]> = {};

  // Group by underwriter
  for (const r of records) {
    if (!grouped[r.underwriterId]) grouped[r.underwriterId] = [];
    grouped[r.underwriterId].push(r);
  }

  return Object.entries(grouped).map(([underwriterId, recs]) => {
    // Sort by time
    recs.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    // Compute drift using linear regression slope
    const riskDrift = slope(recs.map((r) => r.riskScore));
    const fraudDrift = slope(recs.map((r) => r.fraudScore));
    const decisionDrift = slope(recs.map((r) => decisionValue(r.decision)));
    const speedDrift = slope(recs.map((r) => r.decisionTimeMs));

    const biasValues = recs.map((r) => {
      const fico = r.fico ?? 0;
      const income = r.income ?? 0;
      const property = r.propertyType ? propertyValue(r.propertyType) : 0;
      return fico + income + property;
    });

    const biasDrift = slope(biasValues);

    return {
      underwriterId,
      riskDrift,
      fraudDrift,
      decisionDrift,
      speedDrift,
      biasDrift,
    };
  });
}

function slope(values: number[]): number {
  const n = values.length;
  if (n < 2) return 0;

  const x = [...Array(n).keys()];
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = values.reduce((a, b) => a + b, 0) / n;

  let num = 0;
  let den = 0;

  for (let i = 0; i < n; i++) {
    num += (x[i] - meanX) * (values[i] - meanY);
    den += (x[i] - meanX) ** 2;
  }

  return den === 0 ? 0 : num / den;
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

function propertyValue(type: string): number {
  const map: Record<string, number> = {
    "single-family": 1,
    condo: 2,
    "multi-family": 3,
    commercial: 4,
  };
  return map[type] ?? 0;
}
