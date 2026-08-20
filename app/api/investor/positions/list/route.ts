import { NextResponse } from "next/server";
import { requireRole } from "@/lib/authz";
import { db } from "@/lib/db";

export async function GET() {
  const session = await requireRole(["investor"]);

  const positions = await db.position.findMany({
    where: { investorId: session.userId },
  });

  return NextResponse.json({ positions });
}
