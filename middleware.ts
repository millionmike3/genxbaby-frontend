import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  const res = NextResponse.next();

  // Example: attach session to response headers if needed
  if (session) {
    res.headers.set("x-session", session);
  }

  return res;
}
