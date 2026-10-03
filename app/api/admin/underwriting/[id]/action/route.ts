import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const applicationId = params.id;
  const prisma = getPrisma();

  /* ============================
     Admin JWT Authentication
  ============================= */
  const cookieHeader = req.headers.get("cookie") ?? "";
  const token = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("admin_token="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let adminId: string;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    adminId = payload.sub;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  /* ============================
     Parse Body
  ============================= */
  const body = await req.json();
  const action = body.action as "approve" | "decline" | "request_docs";

  if (!action) {
    return NextResponse.json(
      { error: "Missing action: approve | decline | request_docs" },
      { status: 400 }
    );
  }

  /* ============================
     Fetch Application
  ============================= */
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
  });

  if (!application) {
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 }
    );
  }

  /* ============================
     Handle Actions
  ============================= */

  if (action === "approve") {
    await prisma.application.update({
      where: { id: applicationId },
      data: {
        status: "Approved",
      },
    });

    await prisma.underwritingAudit.create({
      data: {
        applicationId,
        adminId,
        action: "Approved",
        notes: body.notes ?? null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Application approved",
    });
  }

  if (action === "decline") {
    await prisma.application.update({
      where: { id: applicationId },
      data: {
        status: "Declined",
      },
    });

    await prisma.underwritingAudit.create({
      data: {
        applicationId,
        adminId,
        action: "Declined",
        notes: body.notes ?? null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Application declined",
    });
  }

  if (action === "request_docs") {
    await prisma.application.update({
      where: { id: applicationId },
      data: {
        status: "Docs Required",
      },
    });

    await prisma.underwritingAudit.create({
      data: {
        applicationId,
        adminId,
        action: "Requested Documents",
        notes: body.notes ?? null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Documents requested",
      required: [
        "Government ID",
        "Paystubs (30 days)",
        "Bank Statements (60 days)",
        "W‑2 / 1099",
        "Utility Bill",
      ],
    });
  }

  return NextResponse.json(
    { error: "Invalid action" },
    { status: 400 }
  );
}
