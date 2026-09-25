import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
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
