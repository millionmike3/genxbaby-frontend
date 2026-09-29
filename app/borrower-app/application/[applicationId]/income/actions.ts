"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";

export async function saveIncome(applicationId: string, formData: FormData) {
  const prisma = getPrisma();

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { borrowerId: true },
  });

  if (!application || !application.borrowerId) {
    throw new Error("Application or borrower not found");
  }

  const borrowerId = application.borrowerId;

  const w2Annual = Number(formData.get("w2IncomeAnnual") || 0);
  const contractorAnnual = Number(formData.get("contractorIncomeAnnual") || 0);
  const selfAnnual = Number(formData.get("selfEmploymentIncomeAnnual") || 0);
  const otherAnnual = Number(formData.get("otherIncomeAnnual") || 0);

  const totalMonthly =
    Math.round(
      (w2Annual +
        contractorAnnual +
        selfAnnual +
        otherAnnual) /
        12
    );

  const data = {
    w2IncomeAnnual: w2Annual,
    w2IncomeMonthly: Math.round(w2Annual / 12),

    contractorIncomeAnnual: contractorAnnual,
    contractorIncomeMonthly: Math.round(contractorAnnual / 12),

    selfEmploymentIncomeAnnual: selfAnnual,
    selfEmploymentIncomeMonthly: Math.round(selfAnnual / 12),

    otherIncomeAnnual: otherAnnual,
    otherIncomeMonthly: Math.round(otherAnnual / 12),

    totalIncomeMonthly: totalMonthly,
  };

  await prisma.borrowerIncome.upsert({
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

  revalidatePath(`/borrower-app/application/${applicationId}/income`);
}
