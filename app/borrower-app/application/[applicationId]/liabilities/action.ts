"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";

export async function saveLiabilities(applicationId: string, formData: FormData) {
  const prisma = getPrisma();

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { borrowerId: true },
  });

  if (!application || !application.borrowerId) {
    throw new Error("Application or borrower not found");
  }

  const borrowerId = application.borrowerId;

  const creditCards = Number(formData.get("creditCardPayments") || 0);
  const autoLoans = Number(formData.get("autoLoanPayments") || 0);
  const studentLoans = Number(formData.get("studentLoanPayments") || 0);
  const personalLoans = Number(formData.get("personalLoanPayments") || 0);
  const collections = Number(formData.get("collectionsPayments") || 0);
  const otherDebt = Number(formData.get("otherDebtPayments") || 0);

  const totalMonthlyDebt =
    creditCards +
    autoLoans +
    studentLoans +
    personalLoans +
    collections +
    otherDebt;

  const data = {
    creditCardPayments: creditCards,
    autoLoanPayments: autoLoans,
    studentLoanPayments: studentLoans,
    personalLoanPayments: personalLoans,
    collectionsPayments: collections,
    otherDebtPayments: otherDebt,
    totalMonthlyDebt,
  };

  await prisma.borrowerLiabilities.upsert({
    where: {
      id: `${applicationId}-${borrowerId}`,
    },
    update: data,
    create: {
      id: `${applicationId}-${borrowerId}`,
      applicationId,
      borrowerId,
      ...data,
    },
  });

  await prisma.application.update({
    where: { id: applicationId },
    data: { status: "in_progress" },
  });

  revalidatePath(`/borrower-app/application/${applicationId}/liabilities`);
}
