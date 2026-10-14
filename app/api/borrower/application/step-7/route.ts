import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const userId = 0;

  const borrower = await prisma.borrower.findFirst({
    where: { userId },
    include: {
      MortgageAsset: true,
    },
  });

  const mortgage = borrower?.MortgageAsset?.[0];

  if (!borrower || !mortgage) {
    return NextResponse.redirect("/borrower/application");
  }

  const mortgageId = mortgage.id;

  const purpose = String(data.get("purpose"));
  const purchasePriceRaw = data.get("purchasePrice");
  const refinanceAmountRaw = data.get("refinanceAmount");

  const purchasePrice = purchasePriceRaw ? Number(purchasePriceRaw) : null;
  const refinanceAmount = refinanceAmountRaw ? Number(refinanceAmountRaw) : null;

  // Update mortgage purpose (MortgageAsset)
  await prisma.MortgageAsset.update({
    where: { id: mortgageId },
    data: {
      purpose,
      purchasePrice,
      refinanceAmount,
    },
  });

  // FraudEvent exists in your schema
  await prisma.fraudEvent.create({
    data: {
      borrowerId: borrower.id,
      eventType: "PURPOSE_UPDATE",
      metadata: {
        purpose,
        purchasePrice,
        refinanceAmount,
      },
    },
  });

  // UnderwritingPrecheck does NOT exist — use UnderwritingEvent instead
  await prisma.underwritingEvent.create({
    data: {
      underwritingCaseId: mortgage.underwritingCaseId ?? null,
      eventType: "PURPOSE_UPDATE",
      payload: {
        purpose,
        purchasePrice,
        refinanceAmount,
      },
    },
  });

  return NextResponse.redirect("/borrower/application/step-8");
}
