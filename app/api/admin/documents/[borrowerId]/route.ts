import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(
  req: Request,
  { params }: { params: { borrowerId: string } }
) {
  const prisma = getPrisma();

  const cookieHeader = req.headers.get("cookie") ?? "";
  const token = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("admin_token="))
    ?.split("=")[1];

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const docs = await prisma.borrowerDocument.findMany({
    where: { borrowerId: params.borrowerId },
    orderBy: { uploadedAt: "desc" },
  });

  return NextResponse.json({
    success: true,
    documents: docs,
  });
}
