import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
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
    // 2. Verify JWT using JOSE
    // ---------------------------------------------
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is missing");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    let payload: any;
    try {
      const verified = await jwtVerify(
        cookie,
        new TextEncoder().encode(secret)
      );
      payload = verified.payload;
    } catch (err) {
      console.error("JWT VERIFY ERROR:", err);
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 3. Ensure admin role
    // ---------------------------------------------
    if (!payload?.role || payload.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // ---------------------------------------------
    // 4. Fetch audit logs
    // ---------------------------------------------
    const logs = await prisma.audit.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        admin: {
          select: {
            email: true,
            walletAddress: true,
          },
        },
      },
    });

    return NextResponse.json({ logs });
  } catch (err) {
    console.error("AUDIT LIST ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
