"use server";

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  try {
    // ---------------------------------------------
    // 1. Extract session cookie
    // ---------------------------------------------
    const cookie = (request as any).cookies.get("admin_session")?.value;

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
    // 3. Load Prisma at runtime (server-only)
    // ---------------------------------------------
    const { prisma } = await import("@/lib/prisma");

    // ---------------------------------------------
    // 4. Fetch fraud flags with related check data
    // ---------------------------------------------
    const flags = await prisma.fraudFlag.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        check: true,
      },
    });

    return NextResponse.json({ flags });
  } catch (err) {
    console.error("FRAUD LIST ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
