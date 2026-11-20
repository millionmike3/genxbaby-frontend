import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(
  req: Request,
  { params }: { params: { borrowerId: string } }
) {
  try {
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
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
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
    // 3. Enforce ADMIN role from unified enum
    // ----------------------------------------------------
    if (payload.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // ----------------------------------------------------
    // 4. Fetch borrower documents
    // ----------------------------------------------------
    const docs = await prisma.borrowerDocument.findMany({
      where: { borrowerId: params.borrowerId },
      orderBy: { uploadedAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      documents: docs,
    });

  } catch (err) {
    console.error("BORROWER DOCS ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
