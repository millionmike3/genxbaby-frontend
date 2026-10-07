import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  const { id } = params;

  const prisma = await getPrisma();

  const check = await prisma.check.findUnique({
    where: { id },
    include: { bankProfile: true },
  });

  if (!check) {
    return NextResponse.json({ error: "Check not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: check.id,
    checkNumber: check.checkNumber,
    payee: check.payee,
    amount: check.amount,
    memo: check.memo,
    status: check.status,
    bank: check.bankProfile
      ? {
          name: check.bankProfile.bankName,
          routing: check.bankProfile.routingNumber,
          account: check.bankProfile.accountNumber,
        }
      : null,
  });
}
