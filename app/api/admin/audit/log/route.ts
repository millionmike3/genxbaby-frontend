import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
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

    let payload;
    try {
      const verified = await jwtVerify(cookie, secret);
      payload = verified.payload;
    } catch (err) {
      console.error("JWT VERIFY ERROR:", err);
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 3. Parse request body
    // ---------------------------------------------
    const { action, metadata } = await req.json();

    // ---------------------------------------------
    // 4. Capture IP address
    // ---------------------------------------------
    const ip =
      (req.headers as any).get?.("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // ---------------------------------------------
    // 5. Write audit log entry
    // ---------------------------------------------
    await prisma.auditLog.create({
      data: {
        adminId: payload.adminId as string,
        action,
        metadata,
        ip,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("AUDIT LOG ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
