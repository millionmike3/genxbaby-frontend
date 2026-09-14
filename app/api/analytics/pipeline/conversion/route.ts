import { NextRequest,  NextResponse } from "next/server";
import { computePipelinePerformance } from "@/lib/engines/pipeline";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const perf = await computePipelinePerformance();
  return NextResponse.json({ data: perf.avgConversion });
}
