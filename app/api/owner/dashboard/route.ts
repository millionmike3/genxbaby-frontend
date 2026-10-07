import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  const prisma = getPrisma();

  // Owner JWT
  const cookieHeader = req.headers.get("cookie") ?? "";
  const token = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("owner_token="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let ownerId: string;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    ownerId = payload.sub;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const owner = await prisma.owner.findUnique({
    where: { id: ownerId },
  });

  const properties = await prisma.property.findMany({
    where: { ownerId },
    include: {
      tenants: true,
      payments: true,
      maintenance: true,
    },
  });

  return NextResponse.json({
    success: true,
    owner,
    properties,
  });
}
