import { correlatePricingBehavior } from "./correlation";
import { getBehaviorVolatility } from "@/services/behavior-engine/volatilityEngine";
import { getLlpaRisk } from "@/services/pricing-engine/llpaRiskEngine";
import { getBluetoothAnomalies } from "@/services/bluetooth-engine/anomalyEngine";
import { getFraudSignals } from "./fraudEngine";

export async function getUnderwritingProfile(userId: number) {
  const correlation = await correlatePricingBehavior(userId);
  const volatility = await getBehaviorVolatility(userId);
  const llpa = await getLlpaRisk(userId);
  const bt = await getBluetoothAnomalies(userId);
  const fraud = await getFraudSignals(userId);

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
