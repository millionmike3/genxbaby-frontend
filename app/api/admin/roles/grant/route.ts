export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { logAudit } from "@/lib/logAudit";

export async function POST(request: NextRequest) {
  try {
    // ---------------------------------------------
    // 1. Parse request body
    // ---------------------------------------------
    const body = await request.json();
    const wallet = body?.wallet;
    const role = body?.role;

    if (!wallet || typeof wallet !== "string" || !wallet.startsWith("0x")) {
      return NextResponse.json(
        { error: "Invalid or missing wallet address" },
        { status: 400 }
      );
    }

    if (!role || typeof role !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing role" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 2. Validate backend URL
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
    // 3. Proxy role grant to backend API
    // ---------------------------------------------
    const response = await fetch(`${backendUrl}/api/admin/roles/grant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet, role }),
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

    // ---------------------------------------------
    // 4. Audit log (only if backend succeeded)
    // ---------------------------------------------
    if (response.ok) {
      await logAudit("GRANT_ROLE", { wallet, role });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (err: any) {
    console.error("FRONTEND ROLE GRANT ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
