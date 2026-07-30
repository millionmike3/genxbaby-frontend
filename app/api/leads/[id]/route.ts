import { NextResponse } from "next/server";
import { getLeadById, updateLead } from "@/lib/db/leads";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const lead = await getLeadById(params.id);

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(lead);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updated = await updateLead(params.id, body);

    return NextResponse.json({
      success: true,
      updated,
    });
  } catch (err) {
    console.error("Lead update failed:", err);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}
