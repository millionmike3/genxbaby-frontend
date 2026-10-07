import { NextRequest,  NextResponse } from "next/server";
import { ScoringDAL } from "@/lib/dal/scoring";

export async function GET(request: NextRequest, { params }: { params: Record<string, string> }) {
  const { userId } = params;

  if (!userId || typeof userId !== "string") {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  try {
    // Pull latest ScoreRecord
    const latest = await ScoringDAL.getLatestScores(userId);

    if (!latest) {
      return NextResponse.json(
        { score: null, signals: [], factors: [], metadata: null },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        fraudScore: latest.fraudScore ?? null,
        riskScore: latest.riskScore ?? null,
        impulsivenessScore: latest.impulsivenessScore ?? null,
        factors: latest.factors ?? [],
        signals: latest.signals ?? [],
        metadata: latest.metadata ?? null,
        createdAt: latest.createdAt,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Risk API error:", err);
    return NextResponse.json(
      { error: "Failed to load risk data" },
      { status: 500 }
    );
  }
}
