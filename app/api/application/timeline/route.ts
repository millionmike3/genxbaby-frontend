import { NextRequest, NextResponse } from "next/server";
import { DAL } from "@/lib/dal";

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const { id } = params;

    const timeline = await DAL.Application.Timeline.getTimeline(id);

    return NextResponse.json({ success: true, data: timeline });
  } catch (err) {
    console.error("Application Timeline API Error:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
