import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { writeFile } from "fs/promises";
import path from "path";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const prisma = getPrisma();

  // Borrower JWT
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

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const type = formData.get("type") as string;
  const applicationId = formData.get("applicationId") as string | null;

  if (!file || !type) {
    return NextResponse.json(
      { error: "Missing file or type" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), "public/uploads", fileName);

  await writeFile(filePath, buffer);

  const doc = await prisma.borrowerDocument.create({
    data: {
      borrowerId,
      applicationId: applicationId || null,
      type,
      fileUrl: `/uploads/${fileName}`,
      status: "uploaded",
    },
  });

  return NextResponse.json({
    success: true,
    document: doc,
  });
}
