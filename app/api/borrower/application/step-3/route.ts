import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const userId = 0;

  const type = String(data.get("type"));
  const monthlyAmount = Number(data.get("monthlyAmount"));
  const description = data.get("description")
    ? String(data.get("description"))
    : null;

  const borrower = await prisma.borrower.findUnique({
    where: { userId },
  });

  if (!borrower) {
    return NextResponse.redirect("/borrower/application");
  }

  // Create income record
  await prisma.income.create({
    data: {
      borrowerId: borrower.id,
      type,
      monthlyAmount,
      description,
    },
  });

  // Trigger underwriting pre-check
  await prisma.underwritingPrecheck.create({
    data: {
      borrowerId: borrower.id,
      trigger: "INCOME_UPDATE",
      details: `Income updated: ${type} - ${monthlyAmount}`,
    },
  });

  // Trigger fraud/behavior scoring
  await prisma.fraudEvent.create({
    data: {
      borrowerId: borrower.id,
      eventType: "INCOME_DECLARATION",
      metadata: {
        type,
        monthlyAmount,
      },
    },
  });

  return NextResponse.redirect("/borrower/application/step-4");
}
