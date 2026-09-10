import { correlatePricingBehavior } from "./correlation";
import type { CorrelationResult } from "./correlation";

/**
 * Unified Risk Score
 * --------------------------------------------------
 * Combines:
 *  - Impulsiveness (behavior)
 *  - Bluetooth risk
 *  - Pricing volatility
 */

export async function getRiskScore(userId: number): Promise<number> {
  const correlation: CorrelationResult = await correlatePricingBehavior(userId);

  const score =
    100 -
    (correlation.impulsivenessAvg * 0.4 +
      correlation.bluetoothRiskAvg * 0.2 +
      correlation.pricingVolatility * 0.3);

  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Risk Signals Breakdown
 * --------------------------------------------------
 * Used by RiskPanel.tsx to render SignalCards
 */

export async function getRiskSignals(userId: number) {
  const correlation: CorrelationResult = await correlatePricingBehavior(userId);

  return [
    {
      title: "Impulsiveness",
      value: correlation.impulsivenessAvg.toFixed(2),
      status:
        correlation.impulsivenessAvg < 30
          ? "good"
          : correlation.impulsivenessAvg < 60
          ? "warning"
          : "bad",
      description: "Average impulsiveness score from recent behavior events.",
    },
    {
      title: "Bluetooth Risk",
      value: correlation.bluetoothRiskAvg.toFixed(2),
      status:
        correlation.bluetoothRiskAvg < 40
          ? "good"
          : correlation.bluetoothRiskAvg < 70
          ? "warning"
          : "bad",
      description: "Signal strength correlation from recent Bluetooth events.",
    },
    {
      title: "Pricing Volatility",
      value: correlation.pricingVolatility.toFixed(2),
      status:
        correlation.pricingVolatility < 30
          ? "good"
          : correlation.pricingVolatility < 60
          ? "warning"
          : "bad",
      description: "Volatility in pricing interactions and quote behavior.",
    },
    {
      title: "Fraud Indicators",
      value: "None",
      status: "good",
      description: "No fraud signals detected (placeholder until engine built).",
    },
  ];
}
