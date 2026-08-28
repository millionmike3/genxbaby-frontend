"use server";

import prisma from "@/lib/prisma";

// ---------------------------------------------------------
// CREATE BANK PROFILE
// ---------------------------------------------------------
export async function createBankProfile(formData: FormData): Promise<void> {
  await prisma.bankProfile.create({
    data: {
      bankName: formData.get("bankName") as string,
      routingNumber: formData.get("routingNumber") as string,
      accountNumber: formData.get("accountNumber") as string,
      nextCheckNumber: Number(formData.get("nextCheckNumber")),
    },
  });
}

// ---------------------------------------------------------
// UPDATE BANK PROFILE
// ---------------------------------------------------------
export async function updateBankProfile(formData: FormData): Promise<void> {
  const id = Number(formData.get("id")); // Prisma requires number

  await prisma.bankProfile.update({
    where: { id },
    data: {
      bankName: formData.get("bankName") as string,
      routingNumber: formData.get("routingNumber") as string,
      accountNumber: formData.get("accountNumber") as string,
      nextCheckNumber: Number(formData.get("nextCheckNumber")),
    },
  });
}

// ---------------------------------------------------------
// UPLOAD SIGNATURE (BankProfile DOES NOT HAVE signature fields)
// ---------------------------------------------------------
export async function uploadSignature(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  const file = formData.get("signature") as File;

  // Convert file → base64
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${file.type};base64,${base64}`;

  // BankProfile does NOT have signatureImage or signatureUrl fields.
  // Signatures belong to Signer, not BankProfile.

  console.warn("BankProfile has no signature fields — upload ignored.");
}
