// lib/mortgage/underwriting.ts
import { prisma } from "@/lib/prisma";

export async function underwriteMortgage(mortgageId: number) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/underwriting/compute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mortgageId }),
  });

  const uw = await res.json();

  await prisma.mortgage.update({
    where: { id: mortgageId },
    data: {
      underwriting: {
        upsert: {
          create: {
            decision: uw.decision,
            dti: uw.dti,
            ltv: uw.ltv,
            conditionsRequired: uw.conditionsRequired,
            ausFinding: uw.ausFinding,
            riskTier: uw.riskTier,
          },
          update: {
            decision: uw.decision,
            dti: uw.dti,
            ltv: uw.ltv,
             ausFinding: uw.ausFinding,
             riskTier: uw.riskTier,
            conditionsRequired: uw.conditionsRequired,
          },
        },
      },
      status: uw.decision === "APPROVED" ? "UW_APPROVED" : "UW_REVIEW",
    },
  });

  return uw;
}
