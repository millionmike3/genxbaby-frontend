import { NextResponse } from "next/server";
import { getLeadById, updateLeadScores } from "@/lib/db/leads";
import { getLeadEvents } from "@/lib/db/events";
import { calculateLeadScore } from "@/lib/lead-scoring";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const leadId = params.id;

    const lead = await getLeadById(leadId);
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const events = await getLeadEvents(leadId);

    const score = calculateLeadScore(lead, events);

    await updateLeadScores(leadId, score);

    return NextResponse.json({
      success: true,
      score,
    });
  } catch (err) {
    console.error("Score calculation failed:", err);
    return NextResponse.json({ error: "Failed to calculate score" }, { status: 500 });
  }
}
