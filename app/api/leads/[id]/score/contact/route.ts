import { NextResponse } from "next/server";
import { logContactAttempt } from "@/lib/db/contacts";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    const attempt = {
      id: crypto.randomUUID(),
      leadId: params.id,
      channel: body.channel,
      outcome: body.outcome,
      notes: body.notes,
      timestamp: new Date(),
    };

    await logContactAttempt(attempt);

    return NextResponse.json({
      success: true,
      attempt,
    });
  } catch (err) {
    console.error("Contact logging failed:", err);
    return NextResponse.json({ error: "Failed to log contact" }, { status: 500 });
  }
}
