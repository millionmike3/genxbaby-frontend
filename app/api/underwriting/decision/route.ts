// app/api/underwriting/decision/route.ts
import { NextResponse } from "next/server";
import { runUnderwriting } from "@/lib/services/underwriting";

export async function POST(req: Request) {
  const body = await req.json();
  const { scores, financials } = body;

  const decision = UnderwritingService.decide(scores, financials);

  return NextResponse.json(decision);
}
