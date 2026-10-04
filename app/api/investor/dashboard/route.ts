import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  const prisma = getPrisma();

  // Investor JWT
  const cookieHeader = req.headers.get("cookie") ?? "";
  const token = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("investor_token="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let investorId: string;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    investorId = payload.sub;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const investor = await prisma.investor.findUnique({
    where: { id: investorId },
  });

  const portfolio = await prisma.investorPortfolio.findFirst({
    where: { investorId },
  });

  const allocations = await prisma.investorAllocation.findMany({
    where: { investorId },
    include: {
      application: {
        include: {
          borrower: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    success: true,
    investor,
    portfolio,
    allocations,
  });
}
