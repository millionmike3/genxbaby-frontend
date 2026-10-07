import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const body = await request.json();
    const { checkNumber, routingNumber, accountNumber } = body;

    const check = await prisma.check.findFirst({
      where: {
        checkNumber,
        routingNumber,
        accountNumber,
      },
      select: {
        id: true,
        amount: true,
        status: true,
        bankProfileId: true,
        signerId: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: check ?? null });
  } catch (err) {
    console.error("Check Verify Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
