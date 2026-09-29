"use server";

import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/prisma";

export async function savePersonalInfo(
  applicationId: string,
  formData: FormData
) {
  const prisma = getPrisma();

  const data = {
    firstName: formData.get("firstName")?.toString().trim() || "",
    middleInitial: formData.get("middleInitial")?.toString().trim() || null,
    lastName: formData.get("lastName")?.toString().trim() || "",
    suffix: formData.get("suffix")?.toString().trim() || null,
    dob: new Date(formData.get("dob")?.toString() || ""),
    ssn: formData.get("ssn")?.toString().trim() || "",
    phone: formData.get("phone")?.toString().trim() || "",
    email: formData.get("email")?.toString().trim() || "",
    address: formData.get("address")?.toString().trim() || "",
    city: formData.get("city")?.toString().trim() || "",
    state: formData.get("state")?.toString().trim() || "",
    zip: formData.get("zip")?.toString().trim() || "",
    yearsAtAddress: Number(formData.get("yearsAtAddress") || 0),
  };

  // Adjust model name/relations to your schema:
  await prisma.borrowerPersonalInfo.upsert({
    where: { applicationId },
    update: data,
    create: {
      applicationId,
      ...data,
    },
  });

  await prisma.mortgageApplication.update({
    where: { id: applicationId },
    data: { currentStep: "personal" },
  });

  revalidatePath(`/borrower-app/application/${applicationId}/personal`);
}
