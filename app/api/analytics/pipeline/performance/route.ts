import { NextRequest, NextResponse } from "next/server";
import { computePipelinePerformance } from "@/lib/engines/pipeline";

export async function GET() {
  const perf = await computePipelinePerformance();
  return NextResponse.json({ score: perf.avgScore });
}
