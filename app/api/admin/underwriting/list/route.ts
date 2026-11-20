import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
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
    // 3. Enforce ADMIN role (uppercase enum)
    // ----------------------------------------------------
    if (payload.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ----------------------------------------------------
    // 4. Fetch applications + borrower info
    // ----------------------------------------------------
    const prisma = getPrisma();

    const applications = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        borrower: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // ----------------------------------------------------
    // 5. Fetch all scores for these applications
    // ----------------------------------------------------
    const scores = await prisma.borrowerScore.findMany({
      where: {
        applicationId: {
          in: applications.map((a) => a.id),
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // ----------------------------------------------------
    // 6. Map applicationId → latest score
    // ----------------------------------------------------
    const scoreMap = new Map<string, any>();
    for (const s of scores) {
      if (!scoreMap.has(s.applicationId)) {
        scoreMap.set(s.applicationId, s);
      }
    }

    // ----------------------------------------------------
    // 7. Build final list items
    // ----------------------------------------------------
    const items = applications.map((a) => ({
      application: a,
      borrower: a.borrower,
      score: scoreMap.get(a.id) ?? null,
    }));

    return NextResponse.json({
      success: true,
      items,
    });

  } catch (err) {
    console.error("UNDERWRITING LIST ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
