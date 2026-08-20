import { NextResponse } from "next/server";
import { requireRole } from "@/lib/authz";
import { db } from "@/lib/db";

export async function GET() {
  await requireRole(["admin"]);

  const admins = await db.user.findMany({
    where: { role: "admin" },
  });

  return NextResponse.json({ admins });
}
