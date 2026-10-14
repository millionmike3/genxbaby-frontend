import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  if (!path.startsWith("/underwriter")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("session_underwriter")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/underwriter/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "UNDERWRITER") {
      return NextResponse.redirect(new URL("/underwriter/login", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/underwriter/login", request.url));
  }
}

export const config = {
  matcher: ["/underwriter/:path*"],
};
