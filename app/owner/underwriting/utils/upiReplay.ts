export type ReplayRecord = {
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

export type ReplayFrame = {
  t: number; // timeline index
  decision: string;
  riskScore: number;
  fraudScore: number;
  bias: number;
  speed: number;
  createdAt: Date;
};

export type ReplayTimeline = {
  underwriterId: string;
  frames: ReplayFrame[];
};

export function computeUPIReplay(records: ReplayRecord[]): ReplayTimeline[] {
  const grouped: Record<string, ReplayRecord[]> = {};

  // Group by underwriter
  for (const r of records) {
    if (!grouped[r.underwriterId]) grouped[r.underwriterId] = [];
    grouped[r.underwriterId].push(r);
  }

  return Object.entries(grouped).map(([underwriterId, recs]) => {
    // Sort by time
    recs.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    const frames = recs.map((r, index) => ({
      t: index,
      decision: r.decision,
      riskScore: r.riskScore,
      fraudScore: r.fraudScore,
      bias: computeBias(r),
      speed: r.decisionTimeMs,
      createdAt: r.createdAt,
    }));

    return {
      underwriterId,
      frames,
    };
  });
}

function computeBias(r: ReplayRecord): number {
  const fico = r.fico ?? 0;
  const income = r.income ?? 0;
  const property = r.propertyType ? propertyValue(r.propertyType) : 0;
  return fico + income + property;
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
