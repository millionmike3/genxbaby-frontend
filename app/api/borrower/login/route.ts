import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPrisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!; // must exist in .env.local

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

    // Create JWT
    const token = jwt.sign(
      {
        sub: borrower.id,
        role: "borrower",
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Response
    const res = NextResponse.json({ success: true });

    // Set secure cookie
    res.cookies.set("borrower_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
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
