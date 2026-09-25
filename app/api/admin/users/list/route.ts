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
    // 2. Fetch all users
    // ---------------------------------------------
    const users = await db.user.findMany();

    return NextResponse.json({ users });
  } catch (err: any) {
    console.error("ADMIN USERS ERROR:", err);

    // Auth failures from requireRole
    if (err.message?.includes("Unauthorized")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (err.message?.includes("Forbidden")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Generic fallback
    return NextResponse.json(
      { error: "Failed to load users" },
      { status: 500 }
    );
  }
}
