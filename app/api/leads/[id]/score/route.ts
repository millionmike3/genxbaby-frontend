import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: leadId } = await context.params;
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Example scoring logic — replace with your own
    const score = Math.floor(Math.random() * 100);

    return NextResponse.json(
      {
        success: true,
        score,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/leads/[id]/score error:", error);

    return NextResponse.json(
      { error: "Failed to calculate score" },
      { status: 500 }
    );
  }
}
