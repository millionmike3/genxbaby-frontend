export interface Metrics {
  sessionMinutes: number;
  clickCount: number;
  clickRate: number;
  burstIndex: number;
  rageClickScore: number;
  formFillTimeMs: number;
  abandonedFormsCount: number;
  avgTimeOnPageMs: number;
  sessionVolatility: number;

  // Stock-specific
  assetChangeCount?: number;
  rapidChangeBursts?: number;
  undoActions?: number;
  holdingPeriodMs?: number;
  portfolioVolatilityIndex?: number;
  reactionTimeToMarketEventMs?: number;

  // Customer-specific
  formsStarted?: number;
  productSwitchCount?: number;
  pagesVisited?: number;
  messageUrgencyScore?: number;
  responseTimeMs?: number;

  // Investor-specific
  commitmentChangeCount?: number;
  withdrawalSpeedMs?: number;
  termChangeCount?: number;
  sentimentScore?: number;
  reactionTimeToNewsMs?: number;
  investmentVolatilityIndex?: number;
  communicationFrequency?: number;
}
