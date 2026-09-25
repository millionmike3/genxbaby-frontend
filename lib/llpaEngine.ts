import { prisma } from "@/lib/prisma";
import { LoanPricingInput } from "./types";

export async function computeLLPAForLoan(loan: LoanPricingInput) {
  const row = await prisma.llpaGrid.findFirst({
    where: {
      investor: loan.investor,
      productType: loan.productType,
      purpose: loan.purpose,
      occupancy: loan.occupancy,
      ficoMin: { lte: loan.fico },
      ficoMax: { gte: loan.fico },
      ltvMin: { lte: loan.ltv },
      ltvMax: { gte: loan.ltv },
      termMonths: loan.termMonths,
    },
  });

  return row?.llpaBps ?? 0;
}
