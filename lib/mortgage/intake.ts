// lib/mortgage/intake.ts
import { prisma } from "@/lib/prisma";

export interface BorrowerIntake {
  fullName: string;
  email: string;
  phone: string;
}

export interface PropertyIntake {
  address: string;
  city: string;
  state: string;
  zip: string;
  value: number;
  type: string;
}

export interface MortgageIntake {
  borrower: BorrowerIntake;
  property: PropertyIntake;
  loanAmount: number;
  loanType: string;
}

/**
 * Full intake flow:
 * 1. Create borrower
 * 2. Create property
 * 3. Create mortgage linking both
 */
export async function createMortgageFromIntake(intake: MortgageIntake) {
  // Create borrower
  const borrower = await prisma.borrower.create({
    data: intake.borrower,
  });

  // Create property
  const property = await prisma.property.create({
    data: intake.property,
  });

  // Create mortgage
  const mortgage = await prisma.mortgage.create({
    data: {
      borrowerId: borrower.id,
      propertyId: property.id,
      loanAmount: intake.loanAmount,
      loanType: intake.loanType,
      status: "INTAKE",
    },
  });

  return { borrower, property, mortgage };
}
