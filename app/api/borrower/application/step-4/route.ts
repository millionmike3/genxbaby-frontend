import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const userId = 0;

  const type = String(data.get("type"));
  const institution = data.get("institution")
    ? String(data.get("institution"))
    : null;
  const amount = Number(data.get("amount"));

  const borrower = await prisma.borrower.findUnique({
    where: { userId },
  });

  if (!borrower) {
    return NextResponse.redirect("/borrower/application");
  }

  // Create asset record
  await prisma.asset.create({
    data: {
      borrowerId: borrower.id,
      type,
      institution,
      amount,
    },
  });

  // Trigger underwriting pre-check
  await prisma.underwritingPrecheck.create({
    data: {
      borrowerId: borrower.id,
      trigger: "ASSET_UPDATE",
      details: `Asset updated: ${type} - ${amount}`,
    },
  });

  // Trigger fraud/behavior scoring
  await prisma.fraudEvent.create({
    data: {
      borrowerId: borrower.id,
      eventType: "ASSET_DECLARATION",
      metadata: {
        type,
        amount,
      },
    },
  });

  return NextResponse.redirect("/borrower/application/step-5");
}
