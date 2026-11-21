import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ACCESS_COOKIE = "auth_token";
const ACCESS_TOKEN_MAX_AGE = 15 * 60;
const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60;

const VALID_ROLES = new Set([
  "ADMIN",
  "OWNER",
  "UNDERWRITER",
  "INVESTOR",
  "LOAN_OFFICER",
  "PROCESSOR",
  "SERVICING",
  "STAFF",
  "BORROWER",
]);

function readableError(value: unknown): string {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  if (Array.isArray(value)) {
    const messages = value
      .map(readableError)
      .filter(Boolean);

    return messages.join("; ");
  }

  if (value && typeof value === "object") {
    const item = value as Record<string, unknown>;

    return (
      readableError(item.message) ||
      readableError(item.error) ||
      readableError(item.detail)
    );
  }

  return "";
}

function getCookieName(cookie: string): string | null {
  const pair = cookie.split(";", 1)[0];
  const separator = pair.indexOf("=");

  return separator > 0 ? pair.substring(0, separator).trim() : null;
}

export async function POST(req: Request) {
  try {
    const authBaseUrl = process.env.AUTH_BACKEND_URL?.replace(/\/+$/, "");

    if (!authBaseUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication service is not configured.",
        },
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
        {
          success: false,
          error: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    const upstream = await fetch(`${authBaseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: body.email.trim(),
        password: body.password,
      }),
      cache: "no-store",
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            readableError(data.message) ||
            readableError(data.error) ||
            "Login failed.",
        },
        { status: upstream.status }
      );
    }

    if (
      typeof data.accessToken !== "string" ||
      !data.accessToken ||
      typeof data.role !== "string" ||
      !VALID_ROLES.has(data.role)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication service returned an invalid login response.",
        },
        { status: 502 }
      );
    }

    const upstreamHeaders = upstream.headers as Headers & {
      getSetCookie?: () => string[];
    };

    const upstreamCookies =
      typeof upstreamHeaders.getSetCookie === "function"
        ? upstreamHeaders.getSetCookie()
        : [];

    const configuredRefreshName =
      process.env.AUTH_REFRESH_COOKIE_NAME?.trim();

    const refreshSetCookie = upstreamCookies.find((cookie) => {
      const cookieName = getCookieName(cookie);

      const correctName = configuredRefreshName
        ? cookieName === configuredRefreshName
        : true;

      const correctPath = /;\s*path=\/auth(?:;|$)/i.test(cookie);

      const isHttpOnly = /;\s*httponly(?:;|$)/i.test(cookie);

      return correctName && correctPath && isHttpOnly;
    });

    const refreshCookiePair = refreshSetCookie?.split(";", 1)[0];
    const separatorIndex = refreshCookiePair?.indexOf("=") ?? -1;

    if (!refreshCookiePair || separatorIndex <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication service did not provide a valid refresh cookie.",
        },
        { status: 502 }
      );
    }

    const refreshCookieName = refreshCookiePair.substring(
      0,
      separatorIndex
    );

    const refreshCookieValue = refreshCookiePair.substring(
      separatorIndex + 1
    );

    if (!refreshCookieValue) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication service provided an empty refresh cookie.",
        },
        { status: 502 }
      );
    }

    const secure = process.env.NODE_ENV === "production";

    const response = NextResponse.json({
      success: true,
      role: data.role,
      roles: Array.isArray(data.roles) ? data.roles : [data.role],
      user: data.user ?? null,
    });

    response.cookies.set(ACCESS_COOKIE, data.accessToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    response.cookies.set(refreshCookieName, refreshCookieValue, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/api/auth",
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error("AUTH BACKEND LOGIN PROXY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to contact the authentication service.",
      },
      { status: 502 }
    );
  }
}