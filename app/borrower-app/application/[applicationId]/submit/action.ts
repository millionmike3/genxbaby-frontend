"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";

export async function submitApplication(applicationId: string) {
  const prisma = getPrisma();

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { borrowerId: true },
  });

  if (!application || !application.borrowerId) {
    throw new Error("Application or borrower not found");
  }

  await prisma.application.update({
    where: { id: applicationId },
    data: {
      status: "submitted",
      updatedAt: new Date(),
    },
  });

  // OPTIONAL: Trigger scoring, fraud, workflow pipelines here
  // await prisma.applicationWorkflowAiLayer.create({ ... })

  revalidatePath(`/borrower-app/application/${applicationId}/submit`);
}
