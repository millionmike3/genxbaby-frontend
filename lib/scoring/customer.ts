export function scoreCustomer(metrics: any) {
  const {
    formFillTimeMs,
    abandonedFormsCount,
    formsStarted,
    productSwitchCount,
    pagesVisited,
    sessionMinutes,
    messageUrgencyScore,
    responseTimeMs,
    sessionVolatility,
    channel, // "mobile" | "desktop"
  } = metrics;

  const formHaste = formFillTimeMs > 0 ? 1_000_000 / formFillTimeMs : 0;
  const abandonRatio =
    formsStarted > 0 ? abandonedFormsCount / formsStarted : 0;
  const switchRate = sessionMinutes > 0 ? productSwitchCount / sessionMinutes : 0;
  const navSpeed = sessionMinutes > 0 ? pagesVisited / sessionMinutes : 0;
  const responseHaste =
    responseTimeMs > 0 ? 1_000_000 / responseTimeMs : 0;

  let raw =
    0.20 * formHaste +
    0.20 * abandonRatio +
    0.15 * switchRate +
    0.15 * navSpeed +
    0.15 * messageUrgencyScore +
    0.10 * responseHaste +
    0.05 * sessionVolatility;

  // Guard short sessions
  if (sessionMinutes < 0.5) {
    return Math.min(raw, 30);
  }

  // Adjust weights by channel
  if (channel === "mobile") {
    raw *= 0.9; // mobile users are naturally faster, less impulsive
  }

  return Math.max(0, Math.min(100, raw));
}
