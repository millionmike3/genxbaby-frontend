import { NextRequest, NextResponse } from "next/server";

import { HealthDAL } from "@/lib/dal/health";

export async function GET(request: NextRequest, { params }: { params: Record<string, string> }) {
  const anomalies = await HealthDAL.getAnomalies();
  return NextResponse.json({ data: anomalies });
}
