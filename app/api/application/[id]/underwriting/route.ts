import { NextRequest, NextResponse } from "next/server";
import { UnderwritingDAL } from "@/lib/dal/underwriting";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const { id } = await context.params;

    const data = await UnderwritingDAL.getByApplication(id);
    const timeline = await UnderwritingDAL.getTimeline(id);

    return NextResponse.json({ data: { underwriting: data, timeline } });
  } catch (err) {
    console.error("Underwriting API Error:", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
