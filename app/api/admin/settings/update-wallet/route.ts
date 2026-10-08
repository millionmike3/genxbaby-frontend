export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function POST(request: NextRequest) {
  try {
    // ---------------------------------------------
    // 1. Extract session cookie
    // ---------------------------------------------
    const cookie = request.cookies.get("admin_token")?.value;


    if (!cookie) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // 2. Verify JWT
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
    // 4. Parse request body
    // ---------------------------------------------
    const body = await request.json();
    const wallet = body?.wallet;

    if (!wallet || typeof wallet !== "string" || !wallet.startsWith("0x")) {
      return NextResponse.json(
        { error: "Invalid wallet address" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 5. Validate backend URL
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      console.error("BACKEND_URL missing");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    // ---------------------------------------------
    // 6. Proxy wallet update to backend
    // ---------------------------------------------
    const response = await fetch(
      `${backendUrl}/api/admin/settings/update-wallet`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminId: payload.adminId ?? null,
          wallet,
        }),
      }
    );

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
    console.error("FRONTEND UPDATE WALLET ERROR:", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
