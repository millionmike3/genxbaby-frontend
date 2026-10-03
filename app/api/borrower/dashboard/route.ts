import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  // Extract borrower JWT from cookie
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

  // Fetch borrower profile
  const borrower = await prisma.borrower.findUnique({
    where: { id: borrowerId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      createdAt: true,
    },
  });

  if (!borrower) {
    return NextResponse.json({ error: "Borrower not found" }, { status: 404 });
  }

  // Fetch latest application
  const latestApplication = await prisma.application.findFirst({
    where: { borrowerId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      loanAmount: true,
      income: true,
      employer: true,
      rent: true,
      city: true,
      dti: true,
      status: true,
      createdAt: true,
    },
  });

  // Fetch latest score (risk, fraud, impulsiveness)
  let latestScore = null;

  if (latestApplication) {
    latestScore = await prisma.borrowerScore.findFirst({
      where: { applicationId: latestApplication.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fraudScore: true,
        riskScore: true,
        impulsivenessScore: true,
        createdAt: true,
      },
    });
  }

  return NextResponse.json({
    success: true,
    borrower,
    latestApplication,
    latestScore,
  });
}
