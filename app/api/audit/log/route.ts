import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const body = await request.json();

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
