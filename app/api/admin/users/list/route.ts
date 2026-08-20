import { NextResponse } from "next/server";
import { requireRole } from "@/lib/authz";
import { db } from "@/lib/db";

export async function GET() {
  await requireRole(["admin"]);

  const users = await db.user.findMany();

  return NextResponse.json({ users });
}
