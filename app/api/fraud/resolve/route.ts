"use server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { jwtVerify } from "jose";
import { logAudit } from "@/lib/logAudit";

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
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing fraud flag ID" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 4. Mark fraud flag as resolved
    // ---------------------------------------------
    const updated = await prisma.fraudFlag.update({
      where: { id },
      data: { resolved: true },
    });

    // ---------------------------------------------
    // 5. Audit log
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
