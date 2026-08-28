// lib/checkActions.ts

import { prisma } from "./db/prisma";

interface CreateCheckInput {
  profileId?: string;   // maps to bankProfileId (Int?)
  signerId?: string;    // signerId is STRING in Prisma
  payee?: string;
  amount: number;
  memo?: string;
}

export async function createCheck({
  profileId,
  signerId,
  payee,
  amount,
  memo,
}: CreateCheckInput) {
  try {
    const check = await prisma.check.create({
      data: {
        checkNumber: crypto.randomUUID(),        // REQUIRED + UNIQUE
        amount,
        memo: memo ?? "",
        payee: payee ?? "",
        status: "PENDING",
        date: new Date(),

        // Prisma expects:
        // bankProfileId: Int?
        bankProfileId: profileId ? Number(profileId) : null,

        // signerId: String?
        signerId: signerId ?? null,
      },
    });

    return check;
  } catch (error) {
    console.error("Error creating check:", error);
    throw new Error("Failed to create check");
  }
}
