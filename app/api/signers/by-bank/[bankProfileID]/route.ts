import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ bankProfileID: string }> }
) {
  const { bankProfileID } = await context.params;

  const signers = await prisma.signer.findMany({
    where: { bankProfileId: Number(bankProfileID) },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(signers);
}
