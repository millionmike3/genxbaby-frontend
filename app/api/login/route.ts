import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { JWT_SECRET } from "@/lib/jwt";

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

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
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

    // Create JWT with REAL role
    const token = await new SignJWT({
      id: user.id,
      role: user.role,
      fullName: user.username ?? null,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(JWT_SECRET);

    // Role-based dashboard routing
    const dashboard = {
  ADMIN: "/admin-portal",
  OWNER: "/owner-portal",
  INVESTOR: "/investor-portal",
  BORROWER: "/borrower-portal",
  UNDERWRITER: "/underwriter/dashboard",
  PROCESSING: "/processor/dashboard",
  SERVICING: "/servicing/dashboard",
  STAFF: "/staff/dashboard",
  LOAN_OFFICER: "/loan-officer/dashboard",
}[user.role] ?? "/login";


    // Set universal cookie
    const res = NextResponse.json({
      success: true,
      redirect: dashboard,   // 🔥 THIS WAS MISSING
    });

    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
