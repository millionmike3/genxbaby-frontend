export function computeUPIAccuracy(records: any[]) {
  const grouped: Record<string, { correct: number; total: number }> = {};

  for (const r of records) {
    if (!grouped[r.underwriterId]) grouped[r.underwriterId] = { correct: 0, total: 0 };
    grouped[r.underwriterId].total++;
    if (r.decision === r.finalOutcome) grouped[r.underwriterId].correct++;
  }

  return Object.entries(grouped).map(([underwriterId, g]) => ({
    underwriterId,
    accuracy: (g.correct / g.total) * 100,
  }));
}
