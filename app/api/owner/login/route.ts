import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const { prisma } = await import("@/lib/prisma");

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password || user.role !== "owner") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, role: "owner" },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({ success: true });

    res.cookies.set("owner_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Owner Login Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
