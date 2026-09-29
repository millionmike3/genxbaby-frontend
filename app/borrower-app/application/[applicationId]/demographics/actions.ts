"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";

export async function saveDemographics(applicationId: string, formData: FormData) {
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
    ethnicity: formData.get("ethnicity")?.toString() || null,
    race: formData.get("race")?.toString() || null,
    sex: formData.get("sex")?.toString() || null,
    collectionMethod: formData.get("collectionMethod")?.toString() || null,
  };

  await prisma.borrowerDemographics.upsert({
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

  revalidatePath(`/borrower-app/application/${applicationId}/demographics`);
}
