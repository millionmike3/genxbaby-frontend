import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

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
// LOGIN ROUTE
// ---------------------------------------------
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Identify user by IP + email
    const ip =
      (req.headers as any).get?.("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const key = `${ip}:${email.toLowerCase()}`;

    // Rate limit check
    if (rateLimit(key)) {
      return NextResponse.json(
        { error: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }

    // Fetch admin
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const ok = await bcrypt.compare(password, admin.passwordHash);

    if (!ok) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // CREATE JWT USING JOSE (ESM SAFE)
    // ---------------------------------------------
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT({
      adminId: admin.id,
      email: admin.email,
      role: admin.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2h")
      .sign(secret);

    // Set cookie
    const res = NextResponse.json({ success: true });

    res.cookies.set({
      name: "admin_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
    });

    return res;
  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
