import { NextRequest,  NextResponse } from "next/server";
import { BehaviorDAL } from "@/lib/dal/behavior";
import { DocumentDAL } from "@/lib/dal/document";

export async function POST(request: NextRequest, { params }: { params: Record<string, string> }) {
  const { applicationId } = await request.json();

  const profile = await BehaviorDAL.getProfile(applicationId);

  const url = await generateBehaviorReport(profile);

  const doc = await DocumentDAL.create({
    applicationId,
    name: "Behavior Report",
    type: "behavior-report",
    url,
  });

  return NextResponse.json({ data: doc });
}

async function generateBehaviorReport(profile: any) {
  return `https://storage.example.com/behavior/${crypto.randomUUID()}.pdf`;
}
