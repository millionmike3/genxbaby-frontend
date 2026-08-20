import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie");

    if (!cookie || !cookie.includes("admin_session=")) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const token = cookie
      .split(";")
      .find((c) => c.trim().startsWith("admin_session="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({
      authenticated: true,
      admin: {
        id: payload.adminId,
        email: payload.email,
        role: payload.role,
        wallet: payload.wallet,
      },
    });
  } catch (err) {
    console.error("SESSION VERIFY ERROR:", err);
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
