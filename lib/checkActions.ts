// lib/checkActions.ts

import { prisma } from "./db/prisma";

interface CreateCheckInput {
  profileId: string;
  payee: string;
  amount: number;
  memo?: string;
}

export async function createCheck({
  profileId,
  payee,
  amount,
  memo,
}: CreateCheckInput) {
  try {
    const check = await prisma.check.create({
      data: {
        profileId,
        payee,
        amount,
        memo: memo ?? "",
        status: "PENDING",
      },
    });

    return check;
  } catch (error) {
    console.error("Error creating check:", error);
    throw new Error("Failed to create check");
  }
}
