import { NextRequest, NextResponse } from "next/server";
import { getLeadEvents } from "@/lib/db/events";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const leadId = searchParams.get("leadId");

  if (typeof leadId !== "string" || leadId.trim() === "") {
    return NextResponse.json(
      { error: "leadId is required" },
      { status: 400 }
    );
  }

  try {
    const events = await getLeadEvents(leadId);
    return NextResponse.json(events);
  } catch (err) {
    console.error("LEAD EVENTS ERROR:", err);
    return NextResponse.json(
      { error: "Failed to load lead events" },
      { status: 500 }
    );
  }
}
