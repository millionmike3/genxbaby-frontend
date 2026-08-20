import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    // 1. Extract session cookie
    const cookie = (req as any).cookies.get("admin_session")?.value;
    if (!cookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Verify JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    let payload;
    try {
      const verified = await jwtVerify(cookie, secret);
      payload = verified.payload;
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // 3. Parse body
    const { password } = await req.json();
    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // 4. Hash password
    const hash = await bcrypt.hash(password, 10);

    // 5. Proxy to backend
    const backendUrl = process.env.BACKEND_URL;
    const response = await fetch(`${backendUrl}/api/admin/settings/update-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adminId: payload.adminId,
        passwordHash: hash,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (err) {
    console.error("FRONTEND PASSWORD UPDATE ERROR:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
