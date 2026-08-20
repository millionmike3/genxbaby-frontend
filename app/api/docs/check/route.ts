import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateCertifiedCheckPdf } from "@/lib/pdf/check";

export async function POST(req: NextRequest) {
  const { profileId, payee, amount, memo } = await req.json();

  const updatedProfile = await prisma.bankProfile.update({
    where: { id: profileId },
    data: { nextCheckNumber: { increment: 1 } },
  });

  const checkNumber = updatedProfile.nextCheckNumber - 1;

  const pdf = await generateCertifiedCheckPdf({
    profile: { ...updatedProfile, nextCheckNumber: checkNumber },
    payee,
    amount,
    memo,
  });

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
