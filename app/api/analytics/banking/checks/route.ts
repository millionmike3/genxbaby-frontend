import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const checks = await prisma.check.findMany({
      select: {
        id: true,
        amount: true,
        checkNumber: true,
        status: true,
        bankProfileId: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    return NextResponse.json({ success: true, data: checks });
  } catch (err) {
    console.error("Banking Checks Analytics Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
