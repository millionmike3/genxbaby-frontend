import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { generateCertifiedCheckPdf } from "@/lib/pdf/check";

export async function POST(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  const { profileId, payee, amount, memo } = await request.json();

  const prisma = await getPrisma();

  // 1. Atomically increment nextCheckNumber
  const updatedProfile = await prisma.bankProfile.update({
    where: { id: profileId },
    data: { nextCheckNumber: { increment: 1 } },
  });

  const checkNumber = updatedProfile.nextCheckNumber - 1;

  // 2. Generate PDF
  const pdf = await generateCertifiedCheckPdf({
    profile: { ...updatedProfile, nextCheckNumber: checkNumber },
    payee,
    amount,
    memo,
  });

  // 3. Log check in DB
  await prisma.check.create({
    data: {
      checkNumber: checkNumber.toString(),
      payee,
      amount,
      memo,
      bankProfileId: updatedProfile.id,
      date: new Date(),
      status: "issued",
    },
  });

  return NextResponse.json({ success: true });
}
