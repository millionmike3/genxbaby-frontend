import { Metrics } from "../types/Metrics";

export function scoreCustomer(metrics: Metrics) {
  const formHaste =
    metrics.formFillTimeMs > 0 ? 1_000_000 / metrics.formFillTimeMs : 0;

  const abandonRatio =
    metrics.formsStarted! > 0
      ? metrics.abandonedFormsCount / metrics.formsStarted!
      : 0;

  const switchRate = metrics.productSwitchCount! / metrics.sessionMinutes;
  const navSpeed = metrics.pagesVisited! / metrics.sessionMinutes;

  const responseHaste =
    metrics.responseTimeMs! > 0 ? 1_000_000 / metrics.responseTimeMs! : 0;

  const raw =
    0.20 * formHaste +
    0.20 * abandonRatio +
    0.15 * switchRate +
    0.15 * navSpeed +
    0.15 * metrics.messageUrgencyScore! +
    0.10 * responseHaste +
    0.05 * metrics.sessionVolatility;

  return Math.max(0, Math.min(100, raw));
}
