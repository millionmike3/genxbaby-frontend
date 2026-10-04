import { NextRequest, NextResponse } from "next/server";
import { getScoring } from "@/lib/dal/scoring";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const results = await getScoring(id);

    return NextResponse.json({ success: true, data: results });
  } catch (err) {
    console.error("Application Scoring Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
