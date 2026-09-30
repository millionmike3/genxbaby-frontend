"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";

export async function saveProperty(applicationId: string, formData: FormData) {
  const prisma = getPrisma();

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { borrowerId: true },
  });

  if (!application || !application.borrowerId) {
    throw new Error("Application or borrower not found");
  }

  const borrowerId = application.borrowerId;

  const purchasePrice = Number(formData.get("purchasePrice") || 0);
  const estimatedValue = Number(formData.get("estimatedValue") || 0);
  const loanAmount = Number(formData.get("loanAmount") || 0);
  const downPayment = Number(formData.get("downPayment") || 0);

  const data = {
    propertyAddress: formData.get("propertyAddress")?.toString().trim() || "",
    propertyCity: formData.get("propertyCity")?.toString().trim() || "",
    propertyState: formData.get("propertyState")?.toString().trim() || "",
    propertyZip: formData.get("propertyZip")?.toString().trim() || "",

    occupancyType: formData.get("occupancyType")?.toString().trim() || null,
    propertyType: formData.get("propertyType")?.toString().trim() || null,

    purchasePrice,
    estimatedValue,
    loanAmount,
    downPayment,
    downPaymentSource:
      formData.get("downPaymentSource")?.toString().trim() || null,
  };

  await prisma.borrowerProperty.upsert({
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

  revalidatePath(`/borrower-app/application/${applicationId}/property`);
}
