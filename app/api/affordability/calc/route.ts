import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const loanType = String(data.get("loanType"));
  const rate = Number(data.get("rate"));
  const downPayment = Number(data.get("downPayment"));
  const taxes = Number(data.get("taxes"));
  const insurance = Number(data.get("insurance"));
  const hoa = Number(data.get("hoa") ?? 0);

  const userId = "REPLACE_WITH_AUTH_USER_ID";

  const borrower = await prisma.borrower.findUnique({
    where: { userId },
    include: {
      income: true,
    },
  });

  const totalMonthlyIncome =
    borrower?.income.reduce((acc, i) => acc + i.monthlyAmount, 0) ?? 0;

  // Mortgage rule: Max DTI 45%
  const maxMonthlyPayment = totalMonthlyIncome * 0.45;

  // Taxes + insurance monthly
  const tiMonthly = taxes / 12 + insurance / 12 + hoa;

  // Mortgage payment formula
  const monthlyRate = rate / 100 / 12;
  const maxMortgagePayment = maxMonthlyPayment - tiMonthly;

  const maxLoanAmount =
    (maxMortgagePayment * (Math.pow(1 + monthlyRate, 360) - 1)) /
    (monthlyRate * Math.pow(1 + monthlyRate, 360));

  const maxPurchasePrice = maxLoanAmount + downPayment;

  // Save affordability result
  await prisma.affordabilityResult.create({
    data: {
      borrowerId: borrower!.id,
      loanType,
      rate,
      downPayment,
      taxes,
      insurance,
      hoa,
      maxLoanAmount,
      maxPurchasePrice,
    },
  });

  return NextResponse.redirect("/affordability/result");
}
