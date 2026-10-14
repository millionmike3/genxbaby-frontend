// lib/mortgage/fraud.ts
import { prisma } from "@/lib/prisma";

export async function runFraudChecks(mortgageId: number) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/fraud/scan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mortgageId }),
  });

  const fraud = await res.json();

  await prisma.mortgage.update({
    where: { id: mortgageId },
    data: {
      fraud: {
        upsert: {
          create: {
            riskScore: fraud.riskScore,
            flags: fraud.flags,
            anomalies: fraud.anomalies,
          },
          update: {
            riskScore: fraud.riskScore,
            flags: fraud.flags,
            anomalies: fraud.anomalies,
          },
        },
      },
    },
  });

  return fraud;
}
