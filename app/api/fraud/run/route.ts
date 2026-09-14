import { NextRequest,  NextResponse } from "next/server";
import { ApplicationDAL } from "@/lib/dal/application";
import { ScoringDAL } from "@/lib/dal/scoring";
import { EnvironmentDAL } from "@/lib/dal/environment";
import { runFraudScan } from "@/lib/engines/fraud";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const { applicationId } = await request.json();

  const app = await ApplicationDAL.getById(applicationId);
  const scoring = await ScoringDAL.getLatest(applicationId);
  const environment = await EnvironmentDAL.getLatest(applicationId);

  const result = await runFraudScan(app, scoring, environment);

  return NextResponse.json({ data: result });
}
