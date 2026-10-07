import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    // ---------------------------------------------
    // 1. Extract session cookie
    // ---------------------------------------------
    const cookie = request.cookies.get("admin_session")?.value;

    if (!cookie) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 2. Verify JWT using JOSE (ESM SAFE)
    // ---------------------------------------------
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET missing");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    try {
      await jwtVerify(cookie, new TextEncoder().encode(secret));
    } catch (err) {
      console.error("JWT VERIFY ERROR:", err);
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 3. Fetch SAR records with related flag + check
    // ---------------------------------------------
    const prisma = await getPrisma();

    const sar = await prisma.suspiciousActivityReport.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        flag: true,
        check: true,
      },
    });

    return NextResponse.json({ sar });
  } catch (err) {
    console.error("SAR LIST ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
