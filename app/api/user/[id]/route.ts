import { NextRequest, NextResponse } from "next/server";
import { DAL } from "@/lib/dal";

export async function GET(request: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const { id } = params;

    const user = await DAL.User.Basic.getById(id);
    const scores = await DAL.User.Scores.getRiskScore(id);
    const fraud = await DAL.User.Fraud.getFraudProfile(id);

    return NextResponse.json({
      success: true,
      data: { user, scores, fraud }
    });
  } catch (err) {
    console.error("User API Error:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
