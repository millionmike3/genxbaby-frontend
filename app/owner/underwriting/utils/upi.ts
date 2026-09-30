export type UnderwriterStat = {
  underwriterId: string;
  _avg: { decisionTimeMs: number | null };
  _count: { decision: number };
};

export type UnderwriterUPIMetric = {
  underwriterId: string;
  avgDecisionTimeMs: number;
  decisionCount: number;
};

export function computeUPIMetrics(
  stats: UnderwriterStat[]
): UnderwriterUPIMetric[] {
  return stats.map((s) => ({
    underwriterId: s.underwriterId,
    avgDecisionTimeMs: s._avg.decisionTimeMs ?? 0,
    decisionCount: s._count.decision,
  }));
}
