import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
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
        voidReason: reason,
        voidedAt: new Date(),
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
