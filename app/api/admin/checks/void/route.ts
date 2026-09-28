"use server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const { id, reason } = await request.json();

    if (!id || !reason) {
      return NextResponse.json(
        { error: "Missing id or reason" },
        { status: 400 }
      );
    }

    await prisma.check.update({
      where: { id },
      data: {
        status: "voided",
        voidedAt: new Date(),
        metadata: {
          voidReason: reason,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Void check error:", err);

    return NextResponse.json(
      { error: "Failed to void check" },
      { status: 500 }
    );
  }
}
