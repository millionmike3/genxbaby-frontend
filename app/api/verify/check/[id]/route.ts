
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

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
