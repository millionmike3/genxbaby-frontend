import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const { id } = params;

    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const disclosure = await prisma.disclosure.findUnique({
      where: { id },
      select: {
        id: true,
        type: true,
        title: true,
        url: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: disclosure });
  } catch (err) {
    console.error("Disclosure Lookup Error:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
