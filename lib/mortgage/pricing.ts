// lib/mortgage/intake.ts
import { prisma } from "@/lib/prisma";

export interface IntakePayload {
  borrowerId: number;
  propertyId: number;
  loanAmount: number;
  loanType: string;
}

export interface PricingInput {
  mortgageId: number;
  fico: number;
  ltv: number;
  loanAmount: number;
  occupancy: string;
  propertyType: string;
  loanType: string;
}

/**
 * Creates a mortgage record from borrower + property intake.
 */
export async function createMortgageFromIntake(payload: IntakePayload) {
  const mortgage = await prisma.mortgage.create({
    data: {
      borrowerId: payload.borrowerId,
      propertyId: payload.propertyId,
      loanAmount: payload.loanAmount,
      loanType: payload.loanType,
      status: "INTAKE",
    },
  });

  return mortgage;
}

/**
 * Prices a mortgage using your backend pricing engine.
 */
export async function priceMortgage(input: PricingInput) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/pricing/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fico: input.fico,
      ltv: input.ltv,
      loan_amount: input.loanAmount,
      occupancy: input.occupancy,
      property_type: input.propertyType,
      loan_type: input.loanType,
    }),
  });

  const pricing = await res.json();

  await prisma.mortgage.update({
    where: { id: input.mortgageId },
    data: {
      pricing: {
        upsert: {
          create: {
            baseRate: pricing.base_rate,
            llpa: pricing.llpa,
            adjustedRate: pricing.adjusted_rate,
            productType: pricing.product_type,
            investorName: pricing.investor_name,
          },
          update: {
            baseRate: pricing.base_rate,
            llpa: pricing.llpa,
            adjustedRate: pricing.adjusted_rate,
            productType: pricing.product_type,
            investorName: pricing.investor_name,
          },
        },
      },
      status: "PRICED",
    },
  });

  return pricing;
}
