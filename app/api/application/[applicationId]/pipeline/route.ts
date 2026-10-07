import { NextRequest, NextResponse } from "next/server";
import { DAL } from "@/lib/dal";

export async function GET(request: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const { id } = context.params;

    const pipeline = await DAL.Application.Pipeline.getPipeline(id);

    return NextResponse.json({ success: true, data: pipeline });
  } catch (err) {
    console.error("Application Pipeline API Error:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
