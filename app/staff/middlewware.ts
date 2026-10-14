import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  if (!path.startsWith("/staff")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("session_staff")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/staff/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "STAFF") {
      return NextResponse.redirect(new URL("/staff/login", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/staff/login", request.url));
  }
}

export const config = {
  matcher: ["/staff/:path*"],
};
