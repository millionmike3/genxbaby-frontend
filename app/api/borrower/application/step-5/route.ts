import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

const QUESTIONS = {
  bankruptcy: "Bankruptcy in past 7 years",
  foreclosure: "Foreclosure in past 7 years",
  lawsuit: "Currently involved in lawsuit",
  delinquent: "Delinquent on federal debt",
  alimony: "Pays alimony or child support",
  coBorrower: "Co‑borrower on loan",
};

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const userId = 0;

  const borrower = await prisma.borrower.findFirst({
    where: { userId },
  });

  if (!borrower) {
    return NextResponse.redirect("/borrower/application");
  }

  // Save each declaration
  for (const key of Object.keys(QUESTIONS)) {
    const answerRaw = data.get(key);
    if (!answerRaw) continue;

    const answer = answerRaw === "yes";

    await prisma.declaration.create({
      data: {
        borrowerId: borrower.id,
        question: QUESTIONS[key],
        answer,
      },
    });

    // Fraud trigger
    await prisma.fraudEvent.create({
      data: {
        borrowerId: borrower.id,
        eventType: "DECLARATION",
        metadata: {
          question: QUESTIONS[key],
          answer,
        },
      },
    });

    // Underwriting pre-check
    await prisma.underwritingPrecheck.create({
      data: {
        borrowerId: borrower.id,
        trigger: "DECLARATION_UPDATE",
        details: `${QUESTIONS[key]}: ${answer ? "Yes" : "No"}`,
      },
    });
  }

  return NextResponse.redirect("/borrower/application/step-6");
}
