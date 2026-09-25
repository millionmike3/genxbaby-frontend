import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
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
      console.error("JWT_SECRET missing");
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
    // 3. Parse request body
    // ---------------------------------------------
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const action = body?.action ?? "unknown_action";
    const details = body?.metadata ?? {};

    // ---------------------------------------------
    // 4. Capture IP address
    // ---------------------------------------------
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwarded || realIp || request.ip || "unknown";

    // ---------------------------------------------
    // 5. Write audit log entry
    // ---------------------------------------------
    await prisma.audit.create({
      data: {
        adminId: payload.adminId ? Number(payload.adminId) : null,
        action,
        details,
        metadata: {
          ...details,
          ip,
          userAgent: request.headers.get("user-agent") ?? null,
        },
        createdAt: new Date(),
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
