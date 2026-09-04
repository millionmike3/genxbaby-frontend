import { prisma } from "@/lib/prisma";
import { LoanPricingInput } from "./types";

export async function getInvestorTierAdjustment(
  input: LoanPricingInput,
  llpaAdj: number,
  notes: string[]
) {
  if (!input.investorId) return 0;

  const sheet = await prisma.investorPricingSheet.findFirst({
    where: { investorId: input.investorId, active: true },
  });

  if (!sheet) return 0;

  const adj = sheet.baseSpread + llpaAdj * sheet.llpaFactor;

  notes.push(
    `Investor sheet: base ${sheet.baseSpread}, LLPA factor ${sheet.llpaFactor}, total +${adj}`
  );

  return adj;
}
