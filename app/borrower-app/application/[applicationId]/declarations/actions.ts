"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";

export async function saveDeclarations(applicationId: string, formData: FormData) {
  const prisma = getPrisma();

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { borrowerId: true },
  });

  if (!application || !application.borrowerId) {
    throw new Error("Application or borrower not found");
  }

  const borrowerId = application.borrowerId;

  const bool = (v: FormDataEntryValue | null) =>
    v?.toString() === "yes" ? true : v?.toString() === "no" ? false : null;

  const data = {
    bankruptcy: bool(formData.get("bankruptcy")),
    foreclosure: bool(formData.get("foreclosure")),
    judgments: bool(formData.get("judgments")),
    delinquentFederalDebt: bool(formData.get("delinquentFederalDebt")),
    alimonyChildSupport: bool(formData.get("alimonyChildSupport")),
    coMakerEndorser: bool(formData.get("coMakerEndorser")),
    ownershipInterest: bool(formData.get("ownershipInterest")),
    outstandingLiens: bool(formData.get("outstandingLiens")),
    citizenshipStatus: formData.get("citizenshipStatus")?.toString() || null,
    militaryService: bool(formData.get("militaryService")),
  };

  await prisma.borrowerDeclarations.upsert({
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

  revalidatePath(`/borrower-app/application/${applicationId}/declarations`);
}
