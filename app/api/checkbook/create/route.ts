import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const checkNo = Number(data.get("checkNo"));
  const bankId = Number(data.get("bankId"));
  const payee = String(data.get("payee"));
  const amount = Number(data.get("amount"));
  const memo = data.get("memo") ? String(data.get("memo")) : null;

  // Create check record
  const check = await prisma.check.create({
    data: {
      checkNo,
      bankId,
      payee,
      amount,
      memo,
    },
  });

  // Fraud trigger
  await prisma.fraudEvent.create({
    data: {
      eventType: "CHECK_CREATED",
      metadata: {
        checkNo,
        payee,
        amount,
      },
    },
  });

  // Redirect to PDF generator
  return NextResponse.redirect(`/api/docs/check?checkNo=${checkNo}`);
}
