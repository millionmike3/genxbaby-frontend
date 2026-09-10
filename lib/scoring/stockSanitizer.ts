export function scoreStockSanitizer(metrics: any) {
  const {
    assetChangeCount,
    rapidChangeBursts,
    undoActions,
    holdingPeriodMs,
    portfolioVolatilityIndex,
    reactionTimeToMarketEventMs,
    sessionMinutes,
    sessionVolatility,
  } = metrics;

  // Caps & floors
  const rapid = Math.min(rapidChangeBursts ?? 0, 50);
  const volatility = Math.min(Math.max(portfolioVolatilityIndex ?? 0, 0), 100);

  // Volatility banding
  const volBand =
    sessionVolatility < 0.3 ? 0.8 :
    sessionVolatility < 0.7 ? 1.0 :
    1.2;

  const changeRate = sessionMinutes > 0 ? assetChangeCount / sessionMinutes : 0;
  const reversalRatio =
    assetChangeCount > 0 ? undoActions / assetChangeCount : 0;
  const holdingHaste =
    holdingPeriodMs > 0 ? 1_000_000 / holdingPeriodMs : 0;
  const reactionSpeed =
    reactionTimeToMarketEventMs > 0
      ? 1_000_000 / reactionTimeToMarketEventMs
      : 0;

  let raw =
    0.25 * changeRate +
    0.20 * rapid +
    0.15 * reversalRatio +
    0.15 * holdingHaste +
    0.15 * volatility +
    0.10 * reactionSpeed;

  raw *= volBand;

  return Math.max(0, Math.min(100, raw));
}
