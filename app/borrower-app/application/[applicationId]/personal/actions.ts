"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";

export async function savePersonalInfo(
  applicationId: string,
  formData: FormData
) {
  const prisma = getPrisma();

  // Load application to get borrowerId
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { borrowerId: true },
  });

  if (!application || !application.borrowerId) {
    throw new Error("Application or borrower not found");
  }

  const borrowerId = application.borrowerId;

  const data = {
    firstName: formData.get("firstName")?.toString().trim() || "",
    middleInitial: formData.get("middleInitial")?.toString().trim() || null,
    lastName: formData.get("lastName")?.toString().trim() || "",
    suffix: formData.get("suffix")?.toString().trim() || null,

    dob: new Date(formData.get("dob")?.toString() || ""),
    ssn: formData.get("ssn")?.toString().trim() || "", // TODO: encrypt at service layer

    phone: formData.get("phone")?.toString().trim() || "",
    email: formData.get("email")?.toString().trim() || "",

    address: formData.get("address")?.toString().trim() || "",
    city: formData.get("city")?.toString().trim() || "",
    state: formData.get("state")?.toString().trim() || "",
    zip: formData.get("zip")?.toString().trim() || "",
    yearsAtAddress: Number(formData.get("yearsAtAddress") || 0),
  };

  // Upsert BorrowerProfile for this application + borrower
  await prisma.borrowerProfile.upsert({
    where: {
      // You can also create a unique index on (applicationId, borrowerId)
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

  // Optionally update application status/step
  await prisma.application.update({
    where: { id: applicationId },
    data: {
      status: "in_progress",
    },
  });

  revalidatePath(`/borrower-app/application/${applicationId}/personal`);
}
