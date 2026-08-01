import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
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
    const { password } = await req.json();

    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 4. Hash new password
    // ---------------------------------------------
    const hash = await bcrypt.hash(password, 10);

    // ---------------------------------------------
    // 5. Update admin password
    // ---------------------------------------------
    await prisma.admin.update({
      where: { id: payload.adminId as string },
      data: { passwordHash: hash },
    });

    // ---------------------------------------------
    // 6. Audit log
    // ---------------------------------------------
    await logAudit("ADMIN_PASSWORD_CHANGE", {
      adminId: payload.adminId,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PASSWORD UPDATE ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
