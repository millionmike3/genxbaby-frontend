import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const log = await prisma.audit.create({
      data: {
        action: body.action,
        details: body.details,
        adminId: body.adminId,
      },
    });

    return NextResponse.json({ success: true, log });
  } catch (err) {
    console.error("Audit log failed:", err);
    return NextResponse.json(
      { error: "Failed to write audit log" },
      { status: 500 }
    );
  }
}
