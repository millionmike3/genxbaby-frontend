import { NextRequest, NextResponse } from "next/server";

import { ApplicationDAL } from "@/lib/dal/application";
import { ScoringDAL } from "@/lib/dal/scoring";
import { FraudDAL } from "@/lib/dal/fraud";
import { runUnderwriting } from "@/lib/engines/underwriting";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const { applicationId } = await request.json();

  const app = await ApplicationDAL.getById(applicationId);
  const scoring = await ScoringDAL.getLatest(applicationId);
  const fraud = await FraudDAL.getLatest(applicationId);

  const result = await runUnderwriting(app, scoring, fraud);

  return NextResponse.json({ data: result });
}
