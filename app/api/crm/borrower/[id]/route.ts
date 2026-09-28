import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  try {
    const { id } = await params;

    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const borrower = await prisma.lead.findUnique({
      where: { id },
      include: {
        contactAttempts: true,
      },
    });

    if (!borrower) {
      return NextResponse.json(
        { error: "Borrower not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ borrower });
  } catch (err) {
    console.error("Borrower Lookup Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
