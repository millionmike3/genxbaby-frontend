import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();

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

  // Lock the application (MortgageAsset)
  await prisma.MortgageAsset.update({
    where: { id: mortgageId },
    data: {
      status: "SUBMITTED",
      submittedAt: new Date(),
    },
  });

  // Trigger underwriting (UnderwritingEvent)
  await prisma.underwritingEvent.create({
    data: {
      underwritingCaseId: mortgage.underwritingCaseId ?? null,
      eventType: "APPLICATION_SUBMITTED",
      payload: {
        mortgageId,
        borrowerId: borrower.id,
      },
    },
  });

  // Trigger fraud/behavior scoring
  await prisma.fraudEvent.create({
    data: {
      borrowerId: borrower.id,
      eventType: "APPLICATION_SUBMITTED",
      metadata: {
        mortgageId,
      },
    },
  });

  return NextResponse.redirect("/borrower");
}
