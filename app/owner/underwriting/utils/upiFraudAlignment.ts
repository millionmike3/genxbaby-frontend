export type FraudRecord = {
  underwriterId: string;
  decision: string; // approved, denied, returned, conditions
  fraudScore: number;
};

export type FraudAlignmentMetric = {
  underwriterId: string;
  alignmentRate: number; // % aligned
  misalignmentRate: number; // % misaligned
  criticalRate: number; // % critically misaligned
};

export function computeUPIFraudAlignment(records: FraudRecord[]): FraudAlignmentMetric[] {
  const grouped: Record<
    string,
    {
      aligned: number;
      misaligned: number;
      critical: number;
      total: number;
    }
  > = {};

  for (const r of records) {
    if (!grouped[r.underwriterId]) {
      grouped[r.underwriterId] = {
        aligned: 0,
        misaligned: 0,
        critical: 0,
        total: 0,
      };
    }

    grouped[r.underwriterId].total += 1;

    // Fraud bands
    const lowFraud = r.fraudScore <= 40;
    const mediumFraud = r.fraudScore > 40 && r.fraudScore <= 70;
    const highFraud = r.fraudScore > 70;

    // Alignment logic
    if (lowFraud && r.decision === "approved") {
      grouped[r.underwriterId].aligned += 1;
    } else if (highFraud && r.decision === "denied") {
      grouped[r.underwriterId].aligned += 1;
    } else if (highFraud && r.decision === "approved") {
      grouped[r.underwriterId].critical += 1;
    } else {
      grouped[r.underwriterId].misaligned += 1;
    }
  }

  return Object.entries(grouped).map(([underwriterId, stats]) => ({
    underwriterId,
    alignmentRate: (stats.aligned / stats.total) * 100,
    misalignmentRate: (stats.misaligned / stats.total) * 100,
    criticalRate: (stats.critical / stats.total) * 100,
  }));
}
