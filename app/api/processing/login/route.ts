import { NextRequest, NextResponse } from "next/server";
import { roleLogin } from "@/lib/auth/login";
import { dashboardMap } from "@/lib/auth/dashboard-map";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const result = await roleLogin(email, password, "PROCESSING");
  if (!result) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({
    success: true,
    redirect: dashboardMap["PROCESSING"],
  });

  res.cookies.set("auth_token", result.token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    domain: "genxbaby.com",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
