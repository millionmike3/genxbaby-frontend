import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // ---------------------------------------------
    // 1. Extract session cookie
    // ---------------------------------------------
    const cookie = request.cookies.get("admin_session")?.value;

    if (!cookie) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 2. Verify JWT using JOSE
    // ---------------------------------------------
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET missing");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    let payload: any;
    try {
      const verified = await jwtVerify(
        cookie,
        new TextEncoder().encode(secret)
      );
      payload = verified.payload;
    } catch (err) {
      console.error("JWT VERIFY ERROR:", err);
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 3. Ensure admin role
    // ---------------------------------------------
    if (!payload?.role || payload.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // ---------------------------------------------
    // 4. Proxy admin list request to backend
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      console.error("BACKEND_URL missing");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const response = await fetch(`${backendUrl}/api/admin/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data;
    try {
      data = await response.json();
    } catch (err) {
      console.error("BACKEND JSON PARSE ERROR:", err);
      return NextResponse.json(
        { error: "Invalid backend response" },
        { status: 502 }
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("FRONTEND ADMIN LIST ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch admin list" },
      { status: 500 }
    );
  }
}
