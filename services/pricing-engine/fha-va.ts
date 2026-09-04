import { prisma } from "@/lib/prisma";
import { LoanPricingInput } from "./types";

export async function getGovAdjustment(input: LoanPricingInput, notes: string[]) {
  if (!["FHA", "VA"].includes(input.loanType)) return 0;

  const overlay = await prisma.productOverlay.findFirst({
    where: {
      productType: input.loanType,
      ficoMin: { lte: input.fico },
      ltvMax: { gte: input.ltv },
    },
  });

  if (!overlay) return 0;

  notes.push(`${input.loanType} overlay: ${overlay.overlayRate.toFixed(3)}`);
  return overlay.overlayRate;
}
