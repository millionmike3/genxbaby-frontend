import { NextRequest,  NextResponse } from "next/server";
import { ScoringDAL } from "@/lib/dal/scoring";
import { DocumentDAL } from "@/lib/dal/document";

export async function POST(request: NextRequest, { params }: { params: Record<string, string> }) {
  const { applicationId } = await request.json();

  const scoring = await ScoringDAL.getLatest(applicationId);

  const url = await generateScoringReport(scoring);

  const doc = await DocumentDAL.create({
    applicationId,
    name: "Scoring Report",
    type: "scoring-report",
    url,
  });

  return NextResponse.json({ data: doc });
}

async function generateScoringReport(scoring: any) {
  return `https://storage.example.com/scoring/${crypto.randomUUID()}.pdf`;
}
