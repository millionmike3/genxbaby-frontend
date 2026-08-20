import { NextRequest, NextResponse } from "next/server";
import { LeadContactAttempt } from "@/lib/types/lead-contact";

// Replace with your DB logic
async function logContactAttempt(
  leadId: string,
  attempt: LeadContactAttempt
) {
  return;
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: leadId } = await context.params;
    const body = await request.json();

    const attempt: LeadContactAttempt = {
      id: crypto.randomUUID(),
      leadId,
      channel: body.channel,
      outcome: body.outcome,
      notes: body.notes,
      timestamp: new Date(),
    };

    await logContactAttempt(leadId, attempt);

    return NextResponse.json({
      success: true,
      message: "Contact attempt logged",
      attempt,
    });
  } catch (err) {
    console.error("Contact logging failed:", err);
    return NextResponse.json(
      { error: "Failed to log contact attempt" },
      { status: 500 }
    );
  }
}
