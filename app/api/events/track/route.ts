import { NextResponse } from "next/server";
import { saveLeadEvent } from "@/lib/db/events";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const event = {
      id: crypto.randomUUID(),
      leadId: String(body.leadId),
      eventType: String(body.eventType),
      page: body.page ? String(body.page) : null,
      element: body.element ? String(body.element) : null,
      description: body.description ? String(body.description) : null,
      timestamp: new Date(),
      responseTimeMs: body.responseTimeMs ?? null,
      lateNight: Boolean(body.lateNight),
      metadata: body.metadata || {},
    };

    await saveLeadEvent(event);

    return NextResponse.json({
      success: true,
      event,
    });
  } catch (err) {
    console.error("Event tracking failed:", err);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}
