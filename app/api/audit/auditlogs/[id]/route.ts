import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const { id } = params;

    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

    const log = await prisma.auditLog.findUnique({
      where: { id },
    });

    if (!log) {
      return NextResponse.json({ error: "Log not found" }, { status: 404 });
    }

    return NextResponse.json(log);
  } catch (err) {
    console.error("Audit Log Fetch Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
