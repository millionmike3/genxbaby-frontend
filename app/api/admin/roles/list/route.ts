export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/authz";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // ---------------------------------------------
    // 1. Ensure admin role
    // ---------------------------------------------
    await requireRole(["admin"]);

    // ---------------------------------------------
    // 2. Fetch admins
    // ---------------------------------------------
    const admins = await db.user.findMany({
      where: { role: "admin" },
    });

    return NextResponse.json({ admins });
  } catch (err) {
    console.error("ADMIN LIST ERROR:", err);

    // If requireRole threw an auth error, return 401/403
    if (err instanceof Error && err.message.includes("Forbidden")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (err instanceof Error && err.message.includes("Unauthorized")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generic fallback
    return NextResponse.json(
      { error: "Failed to load admins" },
      { status: 500 }
    );
  }
}
