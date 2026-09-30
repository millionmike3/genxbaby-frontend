export type BiasRecord = {
  underwriterId: string;
  decision: string;
  fico: number | null;
  income: number | null;
  propertyType: string | null;
};

export type BiasMetric = {
  underwriterId: string;
  ficoBias: number;
  incomeBias: number;
  propertyBias: number;
};

export function computeUPIBias(records: BiasRecord[]): BiasMetric[] {
  const grouped: Record<
    string,
    {
      fico: number[];
      income: number[];
      property: Record<string, number>;
      total: number;
    }
  > = {};

  for (const r of records) {
    if (!grouped[r.underwriterId]) {
      grouped[r.underwriterId] = {
        fico: [],
        income: [],
        property: {},
        total: 0,
      };
    }

    grouped[r.underwriterId].total += 1;

    if (r.fico) grouped[r.underwriterId].fico.push(r.fico);
    if (r.income) grouped[r.underwriterId].income.push(r.income);

    if (r.propertyType) {
      grouped[r.underwriterId].property[r.propertyType] =
        (grouped[r.underwriterId].property[r.propertyType] ?? 0) + 1;
    }
  }

  return Object.entries(grouped).map(([underwriterId, stats]) => {
    const ficoBias =
      stats.fico.length > 1
        ? standardDeviation(stats.fico)
        : 0;

    const incomeBias =
      stats.income.length > 1
        ? standardDeviation(stats.income)
        : 0;

    const propertyBias =
      Object.values(stats.property).length > 1
        ? standardDeviation(Object.values(stats.property))
        : 0;

    return {
      underwriterId,
      ficoBias,
      incomeBias,
      propertyBias,
    };
  });
}

function standardDeviation(values: number[]): number {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance =
    values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) /
    values.length;
  return Math.sqrt(variance);
}
