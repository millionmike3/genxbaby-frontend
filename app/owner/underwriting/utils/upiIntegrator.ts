import { computeUPIMetrics } from "./upi";
import { computeUPIAccuracy } from "./upiAccuracy";
import { computeUPIBias } from "./upiBias";
import { computeUPIRiskAlignment } from "./upiRiskAlignment";
import { computeUPIFraudAlignment } from "./upiFraudAlignment";
import { computeUPIScore } from "./upiScore";

export async function integrateUPI(prisma: any) {
  // 1. Base metrics (speed + volume)
  const underwriterStats = await prisma.underwriterDecision.groupBy({
    by: ["underwriterId"],
    _avg: { decisionTimeMs: true },
    _count: { decision: true },
  });

  const baseMetrics = computeUPIMetrics(underwriterStats);

  // 2. Accuracy
  const accuracyRecords = await prisma.underwriterDecision.findMany({
    select: {
      underwriterId: true,
      decision: true,
      finalOutcome: true,
    },
  });

  const accuracyMetrics = computeUPIAccuracy(accuracyRecords);

  // 3. Bias
  const biasRecords = await prisma.underwriterDecision.findMany({
    select: {
      underwriterId: true,
      decision: true,
      application: {
        select: {
          scoring: {
            select: {
              fico: true,
              income: true,
              propertyType: true,
            },
          },
        },
      },
    },
  });

  const biasMetrics = computeUPIBias(
    biasRecords.map((r) => ({
      underwriterId: r.underwriterId,
      decision: r.decision,
      fico: r.application?.scoring?.fico ?? null,
      income: r.application?.scoring?.income ?? null,
      propertyType: r.application?.scoring?.propertyType ?? null,
    }))
  );

  // 4. Risk alignment
  const riskRecords = await prisma.underwriterDecision.findMany({
    select: {
      underwriterId: true,
      decision: true,
      application: {
        select: {
          scoring: { select: { riskScore: true } },
        },
      },
    },
  });

  const riskMetrics = computeUPIRiskAlignment(
    riskRecords.map((r) => ({
      underwriterId: r.underwriterId,
      decision: r.decision,
      riskScore: r.application?.scoring?.riskScore ?? 0,
    }))
  );

  // 5. Fraud alignment
  const fraudRecords = await prisma.underwriterDecision.findMany({
    select: {
      underwriterId: true,
      decision: true,
      application: {
        select: {
          scoring: { select: { fraudScore: true } },
        },
      },
    },
  });

  const fraudMetrics = computeUPIFraudAlignment(
    fraudRecords.map((r) => ({
      underwriterId: r.underwriterId,
      decision: r.decision,
      fraudScore: r.application?.scoring?.fraudScore ?? 0,
    }))
  );

  // 6. Merge all metrics into a single bundle per underwriter
  const merged = baseMetrics.map((base) => {
    const accuracy = accuracyMetrics.find((a) => a.underwriterId === base.underwriterId);
    const bias = biasMetrics.find((b) => b.underwriterId === base.underwriterId);
    const risk = riskMetrics.find((r) => r.underwriterId === base.underwriterId);
    const fraud = fraudMetrics.find((f) => f.underwriterId === base.underwriterId);

    return {
      underwriterId: base.underwriterId,
      avgDecisionTimeMs: base.avgDecisionTimeMs,
      decisionCount: base.decisionCount,
      accuracy: accuracy?.accuracy ?? 0,
      ficoBias: bias?.ficoBias ?? 0,
      incomeBias: bias?.incomeBias ?? 0,
      propertyBias: bias?.propertyBias ?? 0,
      riskAlignment: risk?.alignmentRate ?? 0,
      riskMisalignment: risk?.misalignmentRate ?? 0,
      riskCritical: risk?.criticalRate ?? 0,
      fraudAlignment: fraud?.alignmentRate ?? 0,
      fraudMisalignment: fraud?.misalignmentRate ?? 0,
      fraudCritical: fraud?.criticalRate ?? 0,
    };
  });

  // 7. Final UPI score
  const upiScores = computeUPIScore(merged);

  return {
    baseMetrics,
    accuracyMetrics,
    biasMetrics,
    riskMetrics,
    fraudMetrics,
    upiScores,
  };
}
