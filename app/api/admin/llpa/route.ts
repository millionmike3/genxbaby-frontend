import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const { rows } = await request.json();

    if (!Array.isArray(rows)) {
      return NextResponse.json(
        { error: "rows must be an array" },
        { status: 400 }
      );
    }

    // optional: clear existing LLPA grid
    await prisma.llpaGridRow.deleteMany();

    // bulk insert
    await prisma.llpaGridRow.createMany({ data: rows });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("LLPA Upload Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
