import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  const { bankProfileID } = params;

  const prisma = await getPrisma();

  const signers = await prisma.signer.findMany({
    where: { bankProfileId: Number(bankProfileID) },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(signers);
}
