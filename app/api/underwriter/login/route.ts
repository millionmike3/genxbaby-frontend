import { NextRequest, NextResponse } from "next/server";
import { roleLogin } from "@/lib/auth/login";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Validate credentials specifically for the Underwriter role
  const result = await roleLogin(email, password, "UNDERWRITER");
  if (!result) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const { token, user } = result;

  // 🚦 Always redirect to the Underwriter portal
  const res = NextResponse.json({
    success: true,
    role: user.role,
    redirect: "/underwriter-portal",
  });

  // Set cookie for authenticated session
  res.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
