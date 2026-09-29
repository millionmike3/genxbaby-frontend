"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";

export async function saveEmployment(applicationId: string, formData: FormData) {
  const prisma = getPrisma();

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { borrowerId: true },
  });

  if (!application || !application.borrowerId) {
    throw new Error("Application or borrower not found");
  }

  const borrowerId = application.borrowerId;

  const data = {
    employerName: formData.get("employerName")?.toString().trim() || "",
    jobTitle: formData.get("jobTitle")?.toString().trim() || null,
    employmentType: formData.get("employmentType")?.toString().trim() || null,
    startDate: formData.get("startDate")
      ? new Date(formData.get("startDate")!.toString())
      : null,
    yearsInProfession: Number(formData.get("yearsInProfession") || 0),
  };

  await prisma.borrowerEmployment.upsert({
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

  revalidatePath(`/borrower-app/application/${applicationId}/employment`);
}
