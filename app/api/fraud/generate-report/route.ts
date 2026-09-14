import { NextRequest,  NextResponse } from "next/server";
import { FraudDAL } from "@/lib/dal/fraud";
import { DocumentDAL } from "@/lib/dal/document";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const { applicationId } = await request.json();

  const fraud = await FraudDAL.getByApplication(applicationId);

  const url = await generateFraudReport(fraud);

  const doc = await DocumentDAL.create({
    applicationId,
    name: "Fraud Report",
    type: "fraud-report",
    url,
  });

  return NextResponse.json({ data: doc });
}

async function generateFraudReport(fraud: any) {
  return `https://storage.example.com/fraud/${crypto.randomUUID()}.pdf`;
}
