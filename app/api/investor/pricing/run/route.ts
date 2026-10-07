import { NextRequest,  NextResponse } from "next/server";
import { applyInvestorPricing } from "@/lib/services/pricing";

export async function POST(request: NextRequest, { params }: { params: Record<string, string> }) {
  const body = await request.json();
  const applicationId = body.applicationId;

  const result = await applyInvestorPricing(applicationId);

  return NextResponse.json(result);
}
