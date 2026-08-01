import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

export async function GET(req: Request) {
  try {
    // ---------------------------------------------
    // 1. Extract session cookie
    // ---------------------------------------------
    const cookie = (req as any).cookies.get("admin_session")?.value;

    if (!cookie) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 2. Verify JWT using JOSE (ESM SAFE)
    // ---------------------------------------------
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
      await jwtVerify(cookie, secret);
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
