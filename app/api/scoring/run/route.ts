import { NextRequest,  NextResponse } from "next/server";
import { ApplicationDAL } from "@/lib/dal/application";
import { BorrowerDAL } from "@/lib/dal/borrower";
import { EnvironmentDAL } from "@/lib/dal/environment";
import { runScoring } from "@/lib/engines/scoring";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const { applicationId } = await request.json();

  const app = await ApplicationDAL.getById(applicationId);
  const borrower = await BorrowerDAL.getById(app.borrowerId);
  const environment = await EnvironmentDAL.getLatest(applicationId);

  const result = await runScoring(app, borrower, environment);

  return NextResponse.json({ data: result });
}
