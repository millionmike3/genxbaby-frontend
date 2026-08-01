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
    const { checkId } = await req.json();

    if (!checkId) {
      return NextResponse.json(
        { error: "Missing checkId" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 4. Update check to VOIDED
    // ---------------------------------------------
    const updated = await prisma.check.update({
      where: { id: checkId },
      data: { memo: "VOIDED" },
    });

    // ---------------------------------------------
    // 5. Audit log
    // ---------------------------------------------
    await logAudit("VOID_CHECK", { checkId });

    return NextResponse.json({ success: true, updated });
  } catch (err) {
    console.error("VOID CHECK ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
