import { NextRequest, NextResponse } from "next/server";

import { UnderwritingDAL } from "@/lib/dal/underwriting";
import { DocumentDAL } from "@/lib/dal/document";

export async function POST(request: NextRequest, { params }: { params: Record<string, string> }) {
  const { applicationId } = await request.json();

  const underwriting = await UnderwritingDAL.getByApplication(applicationId);

  const url = await generateUnderwritingLetter(underwriting);

  const doc = await DocumentDAL.create({
    applicationId,
    name: "Underwriting Decision Letter",
    type: "underwriting-letter",
    url,
  });

  return NextResponse.json({ data: doc });
}

async function generateUnderwritingLetter(uw: any) {
  return `https://storage.example.com/uw/${crypto.randomUUID()}.pdf`;
}
