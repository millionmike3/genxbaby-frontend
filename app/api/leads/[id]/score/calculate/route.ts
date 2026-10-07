export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: leadId } = params;
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
        leadId,
        score,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/leads/[id]/score/calculate error:", error);

    return NextResponse.json(
      { error: "Failed to calculate score" },
      { status: 500 }
    );
  }
}
