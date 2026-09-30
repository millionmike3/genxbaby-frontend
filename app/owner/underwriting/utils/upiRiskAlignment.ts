export type RiskRecord = {
  underwriterId: string;
  decision: string; // approved, denied, returned, conditions
  riskScore: number;
};

export type RiskAlignmentMetric = {
  underwriterId: string;
  alignmentRate: number; // % aligned
  misalignmentRate: number; // % misaligned
  criticalRate: number; // % critically misaligned
};

export function computeUPIRiskAlignment(records: RiskRecord[]): RiskAlignmentMetric[] {
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

    // Define risk bands
    const safeBand = r.riskScore <= 50; // safe
    const cautionBand = r.riskScore > 50 && r.riskScore <= 75; // caution
    const dangerBand = r.riskScore > 75; // danger

    // Alignment logic
    if (safeBand && r.decision === "approved") {
      grouped[r.underwriterId].aligned += 1;
    } else if (dangerBand && r.decision === "denied") {
      grouped[r.underwriterId].aligned += 1;
    } else if (dangerBand && r.decision === "approved") {
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
