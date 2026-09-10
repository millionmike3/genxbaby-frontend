import { NextResponse } from "next/server";
import { applyInvestorPricing } from "@/lib/services/pricing";

export async function POST(req: Request) {
  const body = await req.json();
  const applicationId = body.applicationId;

  const result = await applyInvestorPricing(applicationId);

  return NextResponse.json(result);
}
