import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

export async function GET(req: Request) {
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
    // 3. Fetch checks with related data
    // ---------------------------------------------
    const checks = await prisma.check.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        bankProfile: true,
        signer: true,
        fraudFlags: true,
      },
    });

    return NextResponse.json({ checks });
  } catch (err) {
    console.error("CHECK LIST ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
