import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

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
// LOGIN ROUTE (FRONTEND PROXY)
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

    // ---------------------------------------------
    // 1. Proxy login request to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // Backend returns: { success, token }
    const token = data.token;

    // ---------------------------------------------
    // 2. Set admin session cookie
    // ---------------------------------------------
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
    console.error("FRONTEND ADMIN LOGIN ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
