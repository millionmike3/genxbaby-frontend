import { prisma } from "@/lib/prisma";
import { LoanPricingInput } from "./types";

export async function getNonQmAdjustment(input: LoanPricingInput, notes: string[]) {
  // FIX: match your actual loanType union
  if (input.loanType !== "nonqm") return 0;

  const rule = await prisma.nonQMPricingRule.findFirst({
    where: {
      programName: input.programName,
      ficoMin: { lte: input.fico },
      ltvMax: { gte: input.ltv },
      dscrMin: input.dscr ? { lte: input.dscr } : undefined,
    },
  });

  if (!rule) return 0;

  notes.push(`NON-QM (${rule.programName}) +${rule.rateAdd.toFixed(3)}`);
  return rule.rateAdd;
}
