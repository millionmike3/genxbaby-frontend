import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    const prisma = getPrisma();

    // ----------------------------------------------------
    // 1. Extract unified auth cookie
    // ----------------------------------------------------
    const cookieHeader = req.headers.get("cookie") ?? "";
    const token = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ----------------------------------------------------
    // 2. Verify JWT using JOSE (unified auth backend)
    // ----------------------------------------------------
    let payload: any;
    try {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET)
      );
      payload = verified.payload;
    } catch (err) {
      console.error("JWT VERIFY ERROR:", err);
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // ----------------------------------------------------
    // 3. Enforce INVESTOR role (uppercase enum)
    // ----------------------------------------------------
    if (payload.role !== "INVESTOR") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ----------------------------------------------------
    // 4. Extract investorId from unified JWT payload
    // ----------------------------------------------------
    const investorId = payload.userId;

    // ----------------------------------------------------
    // 5. Fetch investor profile
    // ----------------------------------------------------
    const investor = await prisma.investor.findUnique({
      where: { id: investorId },
    });

    // ----------------------------------------------------
    // 6. Fetch investor portfolio
    // ----------------------------------------------------
    const portfolio = await prisma.investorPortfolio.findFirst({
      where: { investorId },
    });

    // ----------------------------------------------------
    // 7. Fetch allocations + borrower + application info
    // ----------------------------------------------------
    const allocations = await prisma.investorAllocation.findMany({
      where: { investorId },
      include: {
        application: {
          include: {
            borrower: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      investor,
      portfolio,
      allocations,
    });

  } catch (err) {
    console.error("INVESTOR DASHBOARD ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
