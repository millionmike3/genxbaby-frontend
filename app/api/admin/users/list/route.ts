export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/authz";
import { getPrisma } from "@/lib/db/prisma";

export async function GET(request: NextRequest) {
  try {
    // ---------------------------------------------
    // 1. Ensure admin role
    // ---------------------------------------------
    await requireRole(["admin"]);

    // ---------------------------------------------
    // 2. Fetch all users
    // ---------------------------------------------
    const prisma = await getPrisma();

    const users = await prisma.user.findMany();

    return NextResponse.json({ users });
  } catch (err: any) {
    console.error("ADMIN USERS ERROR:", err);

    if (err.message?.includes("Unauthorized")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (err.message?.includes("Forbidden")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(
      { error: "Failed to load users" },
      { status: 500 }
    );
  }
}
