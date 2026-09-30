"use server";

import { getPrisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approveApplication(applicationId: string) {
  const prisma = getPrisma();

  await prisma.application.update({
    where: { id: applicationId },
    data: {
      status: "approved",
      underwritingStatus: "approved",
      updatedAt: new Date(),
    },
    
  });

  revalidatePath(`/owner/applications/${applicationId}`);
}

export async function denyApplication(applicationId: string) {
  const prisma = getPrisma();

  await prisma.application.update({
    where: { id: applicationId },
    data: {
      status: "denied",
      underwritingStatus: "denied",
      updatedAt: new Date(),
    },
  });

  revalidatePath(`/owner/applications/${applicationId}`);
}
export async function returnForEdits(applicationId: string, reason: string) {
  const prisma = getPrisma();

  await prisma.application.update({
    where: { id: applicationId },
    data: {
      status: "returned",
      underwritingStatus: "needs_edits",
      updatedAt: new Date(),
      // Optional: store reason in timeline or a notes table
    },
  });

  await prisma.timelineEvent.create({
    data: {
      applicationId,
      eventType: "returned_for_edits",
      message: reason,
    },
  });

  revalidatePath(`/owner/applications/${applicationId}`);
}
