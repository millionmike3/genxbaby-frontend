import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  const res = NextResponse.next();

  if (token) {
    // Attach JWT to a safe custom header
    res.headers.set("x-auth-token", token);
  }

  return res;
}
