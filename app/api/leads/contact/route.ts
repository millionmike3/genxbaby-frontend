import { NextRequest, NextResponse } from "next/server";
import { LeadContactAttempt } from "@/lib/types/lead-contact";

// Replace with your DB logic
async function logContactAttempt(
  leadId: string,
  attempt: LeadContactAttempt
) {
  return;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body?.leadId) {
      return NextResponse.json(
        { error: "Missing leadId" },
        { status: 400 }
      );
    }

    const attempt: LeadContactAttempt = {
      id: crypto.randomUUID(),
      leadId: body.leadId,
      channel: body.channel,
      outcome: body.outcome,
      notes: body.notes,
      timestamp: new Date(),
    };

    await logContactAttempt(body.leadId, attempt);

    return NextResponse.json({
      success: true,
      message: "Contact attempt logged",
      attempt,
    });
  } catch (err) {
    console.error("POST /api/leads/contact error:", err);
    return NextResponse.json(
      { error: "Failed to log contact attempt" },
      { status: 500 }
    );
  }
}
