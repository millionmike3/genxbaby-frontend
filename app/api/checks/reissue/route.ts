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
    const { oldCheckId, newCheckNumber } = await req.json();

    if (!oldCheckId || !newCheckNumber) {
      return NextResponse.json(
        { error: "Missing oldCheckId or newCheckNumber" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 4. Mark old check as reissued
    // ---------------------------------------------
    const oldCheck = await prisma.check.update({
      where: { id: oldCheckId },
      data: { memo: "REISSUED" },
    });

    // ---------------------------------------------
    // 5. Create new check record
    // ---------------------------------------------
    const newCheck = await prisma.check.create({
      data: {
        checkNumber: newCheckNumber,
        payee: oldCheck.payee,
        amount: oldCheck.amount,
        memo: "REISSUE",
        date: new Date(),
        bankProfileId: oldCheck.bankProfileId,
        signerId: oldCheck.signerId,
        reissuedToId: oldCheck.id,
      },
    });

    // ---------------------------------------------
    // 6. Audit log
    // ---------------------------------------------
    await logAudit("REISSUE_CHECK", {
      oldCheckId,
      newCheckId: newCheck.id,
      newCheckNumber,
    });

    return NextResponse.json({ success: true, newCheck });
  } catch (err) {
    console.error("REISSUE CHECK ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
