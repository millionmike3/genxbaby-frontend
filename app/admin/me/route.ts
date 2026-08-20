
import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // ---------------------------------------------
    // 1. Extract token cookie
    // ---------------------------------------------
    const rawCookie = req.headers.get("cookie");
    const token = rawCookie
      ?.split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 2. Verify JWT
    // ---------------------------------------------
    let payload: { userId: number; role: string };

    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: number;
        role: string;
      };
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 3. Ensure user is admin
    // ---------------------------------------------
    if (payload.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // ---------------------------------------------
    // 4. Fetch admin user profile
    // ---------------------------------------------
    const admin = await prisma.user.findUnique({
      where: { id: payload.userId },
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
    // 5. Return admin profile
    // ---------------------------------------------
    return NextResponse.json({ admin });
  } catch (err) {
    console.error("ADMIN ME ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
