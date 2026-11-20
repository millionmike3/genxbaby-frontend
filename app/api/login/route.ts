
import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "node:crypto";
import { roleLogin } from "@/lib/auth/login";

export const runtime = "nodejs";

const TOKEN_LIFETIME_SECONDS = 60 * 60 * 24 * 7;

function createJwt(payload: Record<string, unknown>): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  const base64Url = (value: string) =>
    Buffer.from(value).toString("base64url");

  const header = base64Url(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    })
  );

  const now = Math.floor(Date.now() / 1000);

  const body = base64Url(
    JSON.stringify({
      ...payload,
      iat: now,
      exp: now + TOKEN_LIFETIME_SECONDS,
    })
  );

  const unsignedToken = `${header}.${body}`;

  const signature = createHmac("sha256", secret)
    .update(unsignedToken)
    .digest("base64url");

  return `${unsignedToken}.${signature}`;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    // Validate credentials using the existing login service.
    const result = await roleLogin(email.trim(), password);

    if (!result?.user) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid credentials.",
        },
        { status: 401 }
      );
    }

    const { user } = result;

    if (
      user.id === undefined ||
      user.id === null ||
      !user.role
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Authenticated user is missing required identity information.",
        },
        { status: 500 }
      );
    }

    // Generate a signed JWT using the server-side secret.
    const token = createJwt({
      sub: String(user.id),
      email: user.email ?? email.trim(),
      role: user.role,
    });

    // Role-based dashboard routing.
    const roleRedirects: Record<string, string> = {
      OWNER: "/owner-portal",
      ADMIN: "/admin-portal",
      INVESTOR: "/investor-portal",
      PROCESSOR: "/processor-portal",
      UNDERWRITER: "/underwriter-portal",
      LOAN_OFFICER: "/loan-officer-portal",
      SERVICING: "/servicing-portal",
      STAFF: "/staff-portal",
      BORROWER: "/borrower-portal",
    };

    const redirect = roleRedirects[user.role] ?? "/";

    const response = NextResponse.json({
      success: true,
      role: user.role,
      redirect,
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: TOKEN_LIFETIME_SECONDS,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to complete login.",
      },
      { status: 500 }
    );
  }
}
