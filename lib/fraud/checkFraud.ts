import { prisma } from "../prisma";

export async function runFraudChecks({
  checkId,
  batchId,
}: {
  checkId?: string;
  batchId?: string;
}) {
  const checks = await prisma.check.findMany({
    where: {
      ...(checkId ? { id: checkId } : {}),
      ...(batchId ? { batchId } : {}),
    },
  });

  const FRAUD_THRESHOLD = 10000;

  const flagged = checks.filter((c) => c.amount > FRAUD_THRESHOLD);

  await Promise.all(
    flagged.map((c) =>
      prisma.check.update({
        where: { id: c.id },
        data: { status: "REVIEW" },
      })
    )
  );

  return {
    total: checks.length,
    flagged: flagged.length,
  };
}
