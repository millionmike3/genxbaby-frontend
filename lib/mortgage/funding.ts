// lib/mortgage/funding.ts
import { prisma } from "@/lib/prisma";

export async function markClearToClose(mortgageId: number) {
  return prisma.mortgage.update({
    where: { id: mortgageId },
    data: { status: "CTC" },
  });
}

export async function fundMortgage(mortgageId: number) {
  return prisma.mortgage.update({
    where: { id: mortgageId },
    data: {
      status: "FUNDED",
      fundedAt: new Date(),
    },
  });
}

export async function recordDisbursement(
  mortgageId: number,
  amount: number,
  description: string
) {
  return prisma.disbursement.create({
    data: {
      mortgageId,
      amount,
      description,
    },
  });
}
