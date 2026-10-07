import { NextRequest, NextResponse } from "next/server";

import { HealthDAL } from "@/lib/dal/health";

export async function GET(request: NextRequest, { params }: { params: Record<string, string> }) {
  const errors = await HealthDAL.getErrors();
  return NextResponse.json({ data: errors });
}
