import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const body = await req.json();

  // Extract borrower from JWT cookie
  const cookieHeader = req.headers.get("cookie") ?? "";
  const token = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("borrower_token="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let borrowerId: string;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    borrowerId = payload.sub;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prisma = getPrisma();

  const loanAmount = Number(body.loanAmount);
  const income = Number(body.income);
  const rent = Number(body.rent);

  // Basic underwriting metrics
  const dti =
    income > 0 ? Number(((rent / income) * 100).toFixed(2)) : null;

  // Simple risk score (placeholder logic)
  const riskScore = (() => {
    if (!dti) return 600;
    if (dti < 20) return 750;
    if (dti < 35) return 700;
    if (dti < 45) return 650;
    return 600;
  })();

  // Simple fraud score (placeholder logic)
  const fraudScore = (() => {
    let score = 100;
    if (loanAmount > 50000) score += 50;
    if (!body.employer) score += 30;
    if (!body.city) score += 20;
    return score;
  })();

  // Simple behavior/impulsiveness score (placeholder logic)
  const impulsivenessScore = (() => {
    let score = 50;
    if (loanAmount > income * 3) score += 30;
    if (dti && dti > 40) score += 20;
    return score;
  })();

  // Create application
  const application = await prisma.application.create({
    data: {
      borrowerId,
      loanAmount,
      income,
      employer: body.employer,
      rent,
      city: body.city,
      dti,
      status: "New",
    },
  });

  // Create scoring record
  const score = await prisma.borrowerScore.create({
    data: {
      borrowerId,
      applicationId: application.id,
      fraudScore,
      riskScore,
      impulsivenessScore,
    },
  });

  return NextResponse.json({
    success: true,
    applicationId: application.id,
    scoreId: score.id,
  });
}
