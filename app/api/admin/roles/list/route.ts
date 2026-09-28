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
    // 2. Fetch roles + admins
    // ---------------------------------------------
    const prisma = await getPrisma();

    const roles = await prisma.role.findMany();

    const admins = await prisma.user.findMany({
      where: { role: "admin" },
    });

    return NextResponse.json({ roles, admins });
  } catch (err) {
    console.error("ADMIN LIST ERROR:", err);

    if (err instanceof Error && err.message.includes("Forbidden")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (err instanceof Error && err.message.includes("Unauthorized")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Failed to load admins" },
      { status: 500 }
    );
  }
}
