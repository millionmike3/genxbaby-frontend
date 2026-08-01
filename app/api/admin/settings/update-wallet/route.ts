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
    const { wallet } = await req.json();

    if (!wallet || typeof wallet !== "string") {
      return NextResponse.json(
        { error: "Invalid wallet address" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 4. Update admin wallet address
    // ---------------------------------------------
    await prisma.admin.update({
      where: { id: payload.adminId as string },
      data: { walletAddress: wallet },
    });

    // ---------------------------------------------
    // 5. Audit log
    // ---------------------------------------------
    await logAudit("ADMIN_WALLET_UPDATE", {
      adminId: payload.adminId,
      wallet,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("WALLET UPDATE ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
