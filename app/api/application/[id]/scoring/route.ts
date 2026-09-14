import { NextRequest, NextResponse } from "next/server";
import { ScoringDAL } from "@/lib/dal/scoring";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const { id } = await context.params;

    const scoring = await ScoringDAL.getLatest(id);
    const timeline = await ScoringDAL.getTimeline(id);

    return NextResponse.json({ data: { scoring, timeline } });
  } catch (err) {
    console.error("Scoring API Error:", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
