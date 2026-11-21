
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const ACCESS_COOKIE = "auth_token";

const REFRESH_COOKIE =
  process.env.AUTH_REFRESH_COOKIE_NAME || "genxbaby_refresh";

export async function POST(request: NextRequest) {
  const authBaseUrl = process.env.AUTH_BACKEND_URL?.replace(/\/+$/, "");

  const refreshToken =
    request.cookies.get(REFRESH_COOKIE)?.value;

  let serverRevoked = false;

  if (authBaseUrl && refreshToken) {
    try {
      const upstream = await fetch(
        `${authBaseUrl}/auth/logout`,
        {
          method: "POST",
          headers: {
            Cookie: `${REFRESH_COOKIE}=${refreshToken}`,
          },
          cache: "no-store",
        }
      );

      serverRevoked = upstream.ok;

      if (!upstream.ok) {
        console.error(
          "CENTRAL AUTH LOGOUT FAILED:",
          upstream.status
        );
      }
    } catch (error) {
      console.error("CENTRAL AUTH LOGOUT ERROR:", error);
    }
  }

  const response = NextResponse.redirect(
    new URL("/login", request.url),
    { status: 303 }
  );

  const secure = process.env.NODE_ENV === "production";

  response.cookies.set(ACCESS_COOKIE, "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });

  response.cookies.set(REFRESH_COOKIE, "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/api/auth",
    expires: new Date(0),
    maxAge: 0,
  });

  if (!serverRevoked && refreshToken) {
    console.warn(
      "Browser cookies cleared, but central refresh-token revocation was not confirmed."
    );
  }

  return response;
}
