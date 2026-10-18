import { NextRequest, NextResponse } from "next/server";
import { roleLogin } from "@/lib/auth/login";
import { dashboardMap } from "@/lib/auth/dashboard-map";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // 🔥 Use the new unified login helper
    const result = await roleLogin(email, password, "INVESTOR");

    if (!result) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🔥 Unified redirect system
    const redirect = dashboardMap["INVESTOR"];

    const res = NextResponse.json({
      success: true,
      redirect,
    });

    // 🔥 Unified cookie system
    res.cookies.set("auth_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      domain: "genxbaby.com",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("INVESTOR LOGIN ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
