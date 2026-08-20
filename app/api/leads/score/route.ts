import { NextRequest, NextResponse } from "next/server";

// Example scoring logic — replace with your own
function calculateLeadScore(data: any): number {
  return Math.floor(Math.random() * 100);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const score = calculateLeadScore(body);

    return NextResponse.json(
      {
        success: true,
        score,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/leads/score error:", error);

    return NextResponse.json(
      { error: "Failed to calculate score" },
      { status: 500 }
    );
  }
}
