import { NextRequest, NextResponse } from "next/server";
// app/api/underwriting/decision/route.ts

import { runUnderwriting } from "@/lib/services/underwriting";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const body = await request.json();
  const { scores, financials } = body;

  const decision = runUnderwriting.decide(scores, financials);

  return NextResponse.json(decision);
}
