import { correlatePricingBehavior } from "./correlation";
import type { CorrelationResult } from "./correlation";

import { getBehaviorVolatility } from "@/services/behavior-engine/volatilityEngine";
import type { VolatilityResult } from "@/services/behavior-engine/volatilityEngine";

import { getLlpaRisk } from "@/services/pricing-engine/llpaRiskEngine";
import type { LlpaRiskResult } from "@/services/pricing-engine/llpaRiskEngine";

import { getBluetoothAnomalies } from "@/services/bluetooth-engine/anomalyEngine";
import type { BluetoothAnomalyResult } from "@/services/bluetooth-engine/anomalyEngine";

import { getFraudSignals } from "./fraudEngine";
import type { FraudResult } from "./fraudEngine";

export interface UnderwritingProfile {
  underwritingScore: number;
  correlation: CorrelationResult;
  volatility: VolatilityResult;
  llpa: LlpaRiskResult;
  bluetooth: BluetoothAnomalyResult;
  fraud: FraudResult;
}

export async function getUnderwritingProfile(
  userId: number
): Promise<UnderwritingProfile> {
  const correlation: CorrelationResult = await correlatePricingBehavior(userId);
  const volatility: VolatilityResult = await getBehaviorVolatility(userId);
  const llpa: LlpaRiskResult = await getLlpaRisk(userId);
  const bt: BluetoothAnomalyResult = await getBluetoothAnomalies(userId);
  const fraud: FraudResult = await getFraudSignals(userId);

  const baseScore =
    100 -
    (correlation.impulsivenessAvg * 0.3 +
      correlation.pricingVolatility * 0.25 +
      volatility.volatilityScore * 0.2 +
      llpa.llpaRiskScore * 0.15 +
      bt.anomalyScore * 0.1 +
      fraud.fraudScore * 0.2);

  const underwritingScore = Math.max(
    0,
    Math.min(100, Math.round(baseScore))
  );

  return {
    underwritingScore,
    correlation,
    volatility,
    llpa,
    bluetooth: bt,
    fraud,
  };
}
