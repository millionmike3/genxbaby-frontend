import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const { id } = params;

    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const investor = await prisma.investor.findUnique({
      where: { id },
      include: {
        behaviors: true,
      },
    });

    if (!investor) {
      return NextResponse.json(
        { error: "Investor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ investor });
  } catch (err) {
    console.error("Investor Lookup Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
