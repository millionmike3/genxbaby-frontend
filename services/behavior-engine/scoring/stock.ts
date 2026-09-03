import { Metrics } from "../types/Metrics";

export function scoreStockSanitizer(metrics: Metrics) {
  const changeRate = metrics.assetChangeCount! / metrics.sessionMinutes;
  const reversalRatio =
    metrics.assetChangeCount! > 0
      ? metrics.undoActions! / metrics.assetChangeCount!
      : 0;

  const holdingHaste =
    metrics.holdingPeriodMs! > 0 ? 1_000_000 / metrics.holdingPeriodMs! : 0;

  const reactionSpeed =
    metrics.reactionTimeToMarketEventMs! > 0
      ? 1_000_000 / metrics.reactionTimeToMarketEventMs!
      : 0;

  const raw =
    0.25 * changeRate +
    0.20 * metrics.rapidChangeBursts! +
    0.15 * reversalRatio +
    0.15 * holdingHaste +
    0.15 * metrics.portfolioVolatilityIndex! +
    0.10 * reactionSpeed;

  return Math.max(0, Math.min(100, raw));
}
