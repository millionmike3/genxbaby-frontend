"use server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  try {
    // Load Prisma at runtime (server‑only)
    const { prisma } = await import("@/lib/prisma");

    const { profileId, payee, amount, memo, date } = await request.json();

    // 1. Atomically increment nextCheckNumber
    const updated = await prisma.bankProfile.update({
      where: { id: profileId },
      data: { nextCheckNumber: { increment: 1 } },
    });

    const checkNumber = updated.nextCheckNumber - 1;

    // 2. Log the check in the Check table
    const checkRecord = await prisma.check.create({
      data: {
        checkNumber: checkNumber.toString(),
        payee,
        amount,
        memo,
        date,
        status: "issued",
        bankProfileId: profileId,
      },
    });

    return NextResponse.json({
      success: true,
      checkNumber,
      checkRecord,
    });
  } catch (err) {
    console.error("CHECK CREATE ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
