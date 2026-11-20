import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const applicationId = params.id;
    const prisma = getPrisma();

    // ----------------------------------------------------
    // 1. Extract unified auth cookie
    // ----------------------------------------------------
    const cookieHeader = req.headers.get("cookie") ?? "";
    const token = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ----------------------------------------------------
    // 2. Verify JWT using JOSE (unified auth backend)
    // ----------------------------------------------------
    let payload: any;
    try {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET)
      );
      payload = verified.payload;
    } catch (err) {
      console.error("JWT VERIFY ERROR:", err);
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // ----------------------------------------------------
    // 3. Enforce ADMIN role (uppercase enum)
    // ----------------------------------------------------
    if (payload.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ----------------------------------------------------
    // 4. Extract adminId from unified JWT payload
    // ----------------------------------------------------
    const adminId = payload.userId; // correct field from unified auth backend

    // ----------------------------------------------------
    // 5. Parse body
    // ----------------------------------------------------
    const body = await req.json();
    const action = body.action as "approve" | "decline" | "request_docs";

    if (!action) {
      return NextResponse.json(
        { error: "Missing action: approve | decline | request_docs" },
        { status: 400 }
      );
    }

    // ----------------------------------------------------
    // 6. Fetch application
    // ----------------------------------------------------
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // ----------------------------------------------------
    // 7. Handle actions
    // ----------------------------------------------------

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

  } catch (err) {
    console.error("UNDERWRITING ACTION ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
