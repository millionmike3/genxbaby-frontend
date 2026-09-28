import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  try {
    const { id } = await params;

    const prisma = await getPrisma();

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        contactAttempts: true,
      },
    });

    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(lead);
  } catch (error) {
    console.error("GET /api/leads/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to fetch lead" },
      { status: 500 }
    );
  }
}
