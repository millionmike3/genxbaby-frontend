import { NextRequest, NextResponse } from "next/server";
import { roleLogin } from "@/lib/auth/login";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // Call unified login function
  const result = await roleLogin(email, password);
  if (!result) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const { user, token } = result;

  // Response with redirect
  const res = NextResponse.json({
    success: true,
    redirect: "/owner-portal",
  });

  // ⭐ THIS SETS THE COOKIE — THIS IS WHAT FIXES YOUR SESSION
  res.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",                     // ⭐ REQUIRED so owner-portal can read it
    maxAge: 60 * 60 * 24 * 7,      // 7 days
  });

  return res;
}
