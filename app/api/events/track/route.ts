import { NextResponse } from "next/server";
import { saveLeadEvent } from "@/lib/db/events";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const event = {
      id: crypto.randomUUID(),
      leadId: body.leadId,
      eventType: body.eventType,
      page: body.page,
      element: body.element,
      description: body.description,
      timestamp: new Date(),
      responseTimeMs: body.responseTimeMs,
      lateNight: body.lateNight,
      metadata: body.metadata || {},
    };

    await saveLeadEvent(event);

    return NextResponse.json({
      success: true,
      event,
    });
  } catch (err) {
    console.error("Event tracking failed:", err);
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 });
  }
}
