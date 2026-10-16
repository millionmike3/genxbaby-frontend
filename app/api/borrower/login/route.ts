import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPrisma } from "@/lib/prisma";
import { SignJWT } from "jose";
import { JWT_SECRET } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const prisma = getPrisma();

    // Borrower lookup
    const borrower = await prisma.borrower.findUnique({
      where: { email },
    });

    if (!borrower) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Validate password
    const valid = await bcrypt.compare(password, borrower.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create unified JWT payload
    const payload = {
      id: borrower.id,
      role: "BORROWER",
      fullName: borrower.fullName ?? null,
    };

    // Create JWT using JOSE + Uint8Array secret
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(JWT_SECRET);

    // Response
    const res = NextResponse.json({ success: true });

    // Set unified cookie
    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err) {
    console.error("Borrower Login Error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
