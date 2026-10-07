import { NextRequest, NextResponse } from "next/server";

import { computeSystemHealth } from "@/lib/engines/health";

export async function GET(request: NextRequest, { params }: { params: Record<string, string> }) {
  const data = await computeSystemHealth();
  return NextResponse.json({ data });
}
