import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") ?? 50);

    const users = await prisma.user.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        username: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: users });
  } catch (err) {
    console.error("Admin Users Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
