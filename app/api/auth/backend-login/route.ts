import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ACCESS_COOKIE = "auth_token";
const ACCESS_TOKEN_MAX_AGE = 15 * 60;
const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60;

export async function POST(req: Request) {
  try {
    const authBaseUrl = process.env.AUTH_BACKEND_URL?.replace(/\/+$/, "");

    if (!authBaseUrl) {
      return NextResponse.json(
        { success: false, error: "Authentication service is not configured." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => null);

    if (
      !body ||
      typeof body.email !== "string" ||
      typeof body.password !== "string" ||
      !body.email.trim() ||
      !body.password
    ) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const upstream = await fetch(`${authBaseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
      cache: "no-store",
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data.message ?? data.error ?? "Login failed.",
        },
        { status: upstream.status }
      );
    }

    if (
      typeof data.accessToken !== "string" ||
      !data.accessToken ||
      typeof data.role !== "string"
    ) {
      return NextResponse.json(
        { success: false, error: "Authentication service returned an invalid response." },
        { status: 502 }
      );
    }

    const headersWithCookies = upstream.headers as Headers & {
      getSetCookie?: () => string[];
    };

    const upstreamCookies =
      typeof headersWithCookies.getSetCookie === "function"
        ? headersWithCookies.getSetCookie()
        : [];

    const refreshSetCookie = upstreamCookies.find(
      (cookie) =>
        /;\s*path=\/auth(?:;|$)/i.test(cookie) &&
        /;\s*httponly(?:;|$)/i.test(cookie)
    );

    const refreshCookiePair = refreshSetCookie?.split(";", 1)[0];
    const separatorIndex = refreshCookiePair?.indexOf("=") ?? -1;

    if (!refreshCookiePair || separatorIndex <= 0) {
      return NextResponse.json(
        { success: false, error: "Authentication service did not provide a refresh cookie." },
        { status: 502 }
      );
    }

    const refreshCookieName = refreshCookiePair.substring(0, separatorIndex);
    const refreshCookieValue = refreshCookiePair.substring(separatorIndex + 1);

    if (!refreshCookieValue) {
      return NextResponse.json(
        { success: false, error: "Authentication service provided an empty refresh cookie." },
        { status: 502 }
      );
    }

    const secure = process.env.NODE_ENV === "production";

    const res = NextResponse.json({
      success: true,
      role: data.role,
      roles: Array.isArray(data.roles) ? data.roles : [data.role],
      user: data.user ?? null,
    });

    res.cookies.set(ACCESS_COOKIE, data.accessToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    res.cookies.set(refreshCookieName, refreshCookieValue, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/api/auth",
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    return res;
  } catch (error) {
    console.error("AUTH BACKEND LOGIN PROXY ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Unable to contact the authentication service." },
      { status: 502 }
    );
  }
}
