import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const userId = 0;

  const borrower = await prisma.borrower.findFirst({
    where: { userId },
    include: {
      MortgageAsset: {
        include: {
          borrowerProperty: true,
        },
      },
    },
  });

  // Borrower must exist AND have at least one MortgageAsset
  const mortgage = borrower?.MortgageAsset?.[0];

  if (!borrower || !mortgage) {
    return NextResponse.redirect("/borrower/application");
  }

  const mortgageId = mortgage.id;

  // Save property details (BorrowerProperty)
  await prisma.borrowerProperty.upsert({
    where: { mortgageAssetId: mortgageId },
    update: {
      address: String(data.get("address")),
      type: String(data.get("type")),
      occupancy: String(data.get("occupancy")),
      estimatedValue: Number(data.get("estimatedValue")),
      beds: Number(data.get("beds")),
      baths: Number(data.get("baths")),
      sqft: Number(data.get("sqft")),
      yearBuilt: Number(data.get("yearBuilt")),
    },
    create: {
      mortgageAssetId: mortgageId,
      address: String(data.get("address")),
      type: String(data.get("type")),
      occupancy: String(data.get("occupancy")),
      estimatedValue: Number(data.get("estimatedValue")),
      beds: Number(data.get("beds")),
      baths: Number(data.get("baths")),
      sqft: Number(data.get("sqft")),
      yearBuilt: Number(data.get("yearBuilt")),
    },
  });

  // FraudEvent exists in your schema
  await prisma.fraudEvent.create({
    data: {
      borrowerId: borrower.id,
      eventType: "PROPERTY_UPDATE",
      metadata: {
        address: String(data.get("address")),
        type: String(data.get("type")),
        occupancy: String(data.get("occupancy")),
      },
    },
  });

  // Your schema does NOT contain underwritingPrecheck
  // You DO have UnderwritingCase, UnderwritingEvent, UnderwritingStep, etc.
  // So we log a simple underwriting event instead:

  await prisma.underwritingEvent.create({
    data: {
      underwritingCaseId: mortgage.underwritingCaseId ?? null,
      eventType: "PROPERTY_UPDATE",
      payload: {
        address: String(data.get("address")),
      },
    },
  });

  return NextResponse.redirect("/borrower/application/step-7");
}
