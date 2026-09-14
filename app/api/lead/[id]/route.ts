import { NextRequest, NextResponse } from "next/server";
import { DAL } from "@/lib/dal";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const { id } = await context.params;

    const lead = await DAL.Lead.Basic.getById(id);
    const scores = await DAL.Lead.Scores.getScoring(id);
    const events = await DAL.Lead.Events.getEvents(id);
    const behavior = await DAL.Lead.Behavior.getBehaviorProfiles(id);

    return NextResponse.json({
      success: true,
      data: { lead, scores, events, behavior }
    });
  } catch (err) {
    console.error("Lead API Error:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
