// lib/mortgage/conditions.ts
import { prisma } from "@/lib/prisma";

export async function addCondition(mortgageId: number, text: string) {
  return prisma.condition.create({
    data: {
      mortgageId,
      text,
      status: "OPEN",
    },
  });
}

export async function updateConditionStatus(
  conditionId: number,
  status: "OPEN" | "CLEARED" | "WAIVED"
) {
  return prisma.condition.update({
    where: { id: conditionId },
    data: { status },
  });
}

export async function listConditions(mortgageId: number) {
  return prisma.condition.findMany({
    where: { mortgageId },
    orderBy: { createdAt: "asc" },
  });
}
