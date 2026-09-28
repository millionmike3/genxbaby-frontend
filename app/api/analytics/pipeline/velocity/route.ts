import { NextRequest, NextResponse } from "next/server";
import { computePipelinePerformance } from "@/lib/engines/pipeline";

export async function GET(request: NextRequest) {
  try {
    const perf = await computePipelinePerformance();
    return NextResponse.json({ data: perf.avgVelocity });
  } catch (err) {
    console.error("Pipeline Velocity Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
