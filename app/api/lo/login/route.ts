import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const { prisma } = await import("@/lib/prisma");

    // Fetch LO user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // FIXED: role must match DB enum
    if (!user || user.role !== "LO") {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // FIXED: correct JWT payload
   const token = jwt.sign(
  {
    userId: user.id,        // REQUIRED
    ownerId: user.ownerId,  // optional
    role: user.role,        // REQUIRED
  },
  JWT_SECRET,
  { expiresIn: "7d" }
    );

    const res = NextResponse.json({ success: true });

    // FIXED: use same cookie name as rest of system
    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("LO Login Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
