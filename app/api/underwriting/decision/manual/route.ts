import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const body = await request.formData();
  const caseIdRaw = body.get("caseId");
  const decision = body.get("decision");

  if (!caseIdRaw || !decision) {
    return NextResponse.json(
      { error: "Missing caseId or decision" },
      { status: 400 }
    );
  }

  // Convert to number (Prisma requires numeric id)
  const caseId = Number(caseIdRaw);

  if (isNaN(caseId)) {
    return NextResponse.json(
      { error: "Invalid caseId" },
      { status: 400 }
    );
  }

  const underwritingCase = await prisma.underwritingCase.update({
    where: { id: caseId },
    data: { status: decision },
    include: { application: true },
  });

  await prisma.timelineEvent.create({
    data: {
      applicationId: underwritingCase.applicationId,
      type: "underwriting_decision",
      message: `Manual decision: ${decision}`,
    },
  });

  return NextResponse.json({ ok: true });
}
