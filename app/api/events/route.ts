import { NextResponse } from "next/server";
import { getLeadEvents } from "@/lib/db/events";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const leadId = searchParams.get("leadId");

  if (!leadId) {
    return NextResponse.json({ error: "leadId is required" }, { status: 400 });
  }

  const events = await getLeadEvents(leadId);

  return NextResponse.json(events);
}
