import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // ---------------------------------------------
    // 1. Extract session cookie
    // ---------------------------------------------
    const cookie = (req as any).cookies.get("admin_session")?.value;

    if (!cookie) {
      return NextResponse.json(
        { error: "Not authenticated" },
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
    // 3. Fetch admin from database
    // ---------------------------------------------
    const admin = await prisma.admin.findUnique({
      where: { id: payload.adminId as string },
      select: {
        id: true,
        email: true,
        role: true,
        walletAddress: true,
      },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      );
    }

    // ---------------------------------------------
    // 4. Return admin profile + session info
    // ---------------------------------------------
    return NextResponse.json({
      admin,
      session: {
        expiresIn: payload.exp, // jose preserves exp claim
      },
    });
  } catch (err) {
    console.error("ADMIN ME ERROR:", err);
    return NextResponse.json(
      { error: "Invalid session" },
      { status: 401 }
    );
  }
}
