"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";

export async function saveAssets(applicationId: string, formData: FormData) {
  const prisma = getPrisma();

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { borrowerId: true },
  });

  if (!application || !application.borrowerId) {
    throw new Error("Application or borrower not found");
  }

  const borrowerId = application.borrowerId;

  const checking = Number(formData.get("checkingBalance") || 0);
  const savings = Number(formData.get("savingsBalance") || 0);
  const cash = Number(formData.get("cashOnHand") || 0);
  const retirement = Number(formData.get("retirementBalance") || 0);
  const investments = Number(formData.get("investmentBalance") || 0);
  const other = Number(formData.get("otherAssets") || 0);

  const totalAssets =
    checking + savings + cash + retirement + investments + other;

  const data = {
    checkingBalance: checking,
    savingsBalance: savings,
    cashOnHand: cash,
    retirementBalance: retirement,
    investmentBalance: investments,
    otherAssets: other,
    totalAssets,
  };

  await prisma.borrowerAssets.upsert({
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

  revalidatePath(`/borrower-app/application/${applicationId}/assets`);
}
