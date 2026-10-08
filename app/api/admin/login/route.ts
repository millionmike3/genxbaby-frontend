import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ---------------------------------------------
// RATE LIMITING CONFIG
// ---------------------------------------------
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

// In-memory attempt tracking
const attempts = new Map<string, { count: number; first: number }>();

function rateLimit(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry) {
    attempts.set(key, { count: 1, first: now });
    return false;
  }

  if (now - entry.first > WINDOW_MS) {
    attempts.set(key, { count: 1, first: now });
    return false;
  }

  entry.count += 1;
  attempts.set(key, entry);

  return entry.count > MAX_ATTEMPTS;
}

// ---------------------------------------------
// ADMIN LOGIN ROUTE (DIRECT AUTH)
// ---------------------------------------------
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Identify user by IP + email
    const ip =
      (request.headers as any).get?.("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const key = `${ip}:${email.toLowerCase()}`;

    // Rate limit check
    if (rateLimit(key)) {
      return NextResponse.json(
        { error: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }

    // Load Prisma dynamically (Turbopack-safe)
    const { prisma } = await import("@/lib/prisma");

    // Find admin user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Validate password (bcrypt)
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: "admin",
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Response
    const res = NextResponse.json({ success: true });

    // Set secure cookie
   res.cookies.set("admin_token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",       // REQUIRED for localhost
  sameSite: "none",     // REQUIRED for Edge + fetch
  path: "/",            // REQUIRED so /admin-app can read it
  maxAge: 60 * 60 * 24 * 7,
});


    return res;
  } catch (err) {
    console.error("Admin Login Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
