import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: { applicationId: string } }
) {
  const body = await req.json();
  const { docId, reason, approve } = body;

  if (reason) {
    await prisma.documentRequirement.update({
      where: { id: docId },
      data: { exceptionReason: reason, exceptionApproved: false },
    });
  }

  if (approve) {
    await prisma.documentRequirement.update({
      where: { id: docId },
      data: { exceptionApproved: true },
    });
  }

  return NextResponse.json({ success: true });
}
