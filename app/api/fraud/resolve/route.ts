import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { logAudit } from "@/lib/logAudit";

export async function POST(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    // ---------------------------------------------
    // 1. Extract session cookie
    // ---------------------------------------------
    const cookie = request.cookies.get("admin_token")?.value;


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
    // 3. Parse request body
    // ---------------------------------------------
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing fraud flag ID" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 4. Load Prisma at runtime (server-only)
    // ---------------------------------------------
    const { prisma } = await import("@/lib/prisma");

    // ---------------------------------------------
    // 5. Mark fraud flag as resolved
    // ---------------------------------------------
    const updated = await prisma.fraudFlag.update({
      where: { id },
      data: { resolved: true },
    });

    // ---------------------------------------------
    // 6. Audit log
    // ---------------------------------------------
    await logAudit("RESOLVE_FRAUD_FLAG", { flagId: id });

    return NextResponse.json({ success: true, updated });
  } catch (err) {
    console.error("RESOLVE FRAUD ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
