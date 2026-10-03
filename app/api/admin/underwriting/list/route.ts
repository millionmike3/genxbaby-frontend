import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  // Extract admin JWT
  const cookieHeader = req.headers.get("cookie") ?? "";
  const token = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("admin_token="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify JWT + role
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prisma = getPrisma();

  // Fetch all applications + borrower info
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      borrower: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  // Fetch all scores for these applications
  const scores = await prisma.borrowerScore.findMany({
    where: {
      applicationId: {
        in: applications.map((a) => a.id),
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Map applicationId → latest score
  const scoreMap = new Map<string, any>();
  for (const s of scores) {
    if (!scoreMap.has(s.applicationId)) {
      scoreMap.set(s.applicationId, s);
    }
  }

  // Build final list items
  const items = applications.map((a) => ({
    application: a,
    borrower: a.borrower,
    score: scoreMap.get(a.id) ?? null,
  }));

  return NextResponse.json({
    success: true,
    items,
  });
}
