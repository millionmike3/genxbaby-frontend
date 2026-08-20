
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/logAudit";

export async function POST(req: Request) {
  try {
    const { wallet, role } = await req.json();

    if (!wallet || !role) {
      return NextResponse.json(
        { error: "Missing wallet or role" },
        { status: 400 }
      );
    }

    // ---------------------------------------------
    // 1. Proxy role grant to backend API
    // ---------------------------------------------
    const backendUrl = process.env.BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/admin/roles/grant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet, role }),
    });

    const data = await response.json();

    // ---------------------------------------------
    // 2. Audit log (only if backend succeeded)
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
