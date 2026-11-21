
import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "node:crypto";
import { roleLogin } from "@/lib/auth/login";

export const runtime = "nodejs";

const TOKEN_LIFETIME = 60 * 60 * 24 * 7;

function createJwt(user: {
  id: string | number;
  email?: string | null;
  role: string;
}): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  const encode = (value: string) =>
    Buffer.from(value).toString("base64url");

  const now = Math.floor(Date.now() / 1000);

  const header = encode(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    })
  );

  const payload = encode(
    JSON.stringify({
      sub: String(user.id),
      email: user.email,
      role: user.role,
      iat: now,
      exp: now + TOKEN_LIFETIME,
    })
  );

  const unsignedToken = `${header}.${payload}`;

  const signature = createHmac("sha256", secret)
    .update(unsignedToken)
    .digest("base64url");

  return `${unsignedToken}.${signature}`;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Validate credentials using your existing unified login.
    const result = await roleLogin(email.trim(), password);

    if (!result?.user) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const { user } = result;

    if (user.id == null || !user.role) {
      return NextResponse.json(
        { success: false, error: "Invalid user identity or role." },
        { status: 500 }
      );
    }

    // Sign JWT using the server-side JWT_SECRET.
    const token = createJwt({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const roleRedirects: Record<string, string> = {
      OWNER: "/owner-portal",
      ADMIN: "/admin-portal",
      INVESTOR: "/investor-portal",
      UNDERWRITER: "/underwriter-portal",
      PROCESSOR: "/processor-portal",
      LOAN_OFFICER: "/loan-officer-portal",
      SERVICING: "/servicing-portal",
      STAFF: "/staff-portal",
      BORROWER: "/borrower-portal",
    };

    const res = NextResponse.json({
      success: true,
      role: user.role,
      redirect: roleRedirects[user.role] ?? "/",
    });

    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: TOKEN_LIFETIME,
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { success: false, error: "Login failed." },
      { status: 500 }
    );
  }
}
