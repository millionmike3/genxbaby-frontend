export function computeBehavioralVolatilityIndex(
  data: {
    borrowerId: string;
    fraud: number;
    risk: number;
    impulsiveness: number;
    timestamp: Date;
  }[]
) {
  if (data.length < 3) return 100; // stable by default

  // Group by borrower
  const grouped = data.reduce((acc, d) => {
    if (!acc[d.borrowerId]) acc[d.borrowerId] = [];
    acc[d.borrowerId].push(d);
    return acc;
  }, {} as Record<string, typeof data>);

  let volatilityScores: number[] = [];

  for (const borrowerId in grouped) {
    const timeline = grouped[borrowerId].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );

    // Compute deltas
    const deltas = timeline.map((d, i, arr) => {
      if (i === 0) return 0;
      const prev = arr[i - 1];
      return (
        Math.abs(d.fraud - prev.fraud) +
        Math.abs(d.risk - prev.risk) +
        Math.abs(d.impulsiveness - prev.impulsiveness)
      );
    });

    const avgDelta =
      deltas.reduce((acc, v) => acc + v, 0) / Math.max(deltas.length, 1);

    // Flip-rate (instability)
    const flips = deltas.filter((v) => v > 15).length; // threshold
    const flipRate = flips / deltas.length;

    // Borrower volatility score (0–100)
    const borrowerVol =
      Math.min(100, avgDelta * 2 + flipRate * 50); // weighted model

    volatilityScores.push(borrowerVol);
  }

  // Portfolio-level volatility = mean borrower volatility
  const portfolioVol =
    volatilityScores.reduce((acc, v) => acc + v, 0) /
    Math.max(volatilityScores.length, 1);

  // Convert to stability score (higher = more stable)
  const BVI = Math.max(0, 100 - portfolioVol);

  return Math.round(BVI);
}
