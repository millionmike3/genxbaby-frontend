export function scoreInvestor(metrics: any, history: any[] = []) {
  const {
    commitmentChangeCount,
    withdrawalSpeedMs,
    termChangeCount,
    sentimentScore,
    reactionTimeToNewsMs,
    investmentVolatilityIndex,
    communicationFrequency,
    sessionMinutes,
  } = metrics;

  const commitRate =
    sessionMinutes > 0 ? commitmentChangeCount / sessionMinutes : 0;

  const withdrawHaste =
    withdrawalSpeedMs > 0 ? 1_000_000 / withdrawalSpeedMs : 0;

  const reactionSpeed =
    reactionTimeToNewsMs > 0 ? 1_000_000 / reactionTimeToNewsMs : 0;

  // Normalize termChangeCount per time window (weekly)
  const normalizedTermChanges = termChangeCount / 7;

  // Smooth sentimentScore using moving average
  const pastSentiments = history.map((h) => h.sentimentScore ?? 0);
  const avgSentiment =
    pastSentiments.length > 0
      ? (pastSentiments.reduce((a, b) => a + b, 0) / pastSentiments.length +
          sentimentScore) /
        2
      : sentimentScore;

  const raw =
    0.25 * commitRate +
    0.20 * withdrawHaste +
    0.15 * normalizedTermChanges +
    0.15 * avgSentiment +
    0.10 * reactionSpeed +
    0.10 * investmentVolatilityIndex +
    0.05 * communicationFrequency;

  return Math.max(0, Math.min(100, raw));
}
