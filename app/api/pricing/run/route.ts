import { NextRequest,  NextResponse } from "next/server";
import { ApplicationDAL } from "@/lib/dal/application";
import { UnderwritingDAL } from "@/lib/dal/underwriting";
import { ScoringDAL } from "@/lib/dal/scoring";
import { FraudDAL } from "@/lib/dal/fraud";
import { runPricing } from "@/lib/engines/pricing";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const { applicationId } = await request.json();

  const app = await ApplicationDAL.getById(applicationId);
  const underwriting = await UnderwritingDAL.getByApplication(applicationId);
  const scoring = await ScoringDAL.getLatest(applicationId);
  const fraud = await FraudDAL.getLatest(applicationId);

  const result = await runPricing(app, underwriting, scoring, fraud);

  return NextResponse.json({ data: result });
}
