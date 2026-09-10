import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.formData();
  const caseId = body.get("caseId") as string | null;
  const decision = body.get("decision") as string | null;

  if (!caseId || !decision) {
    return NextResponse.json(
      { error: "Missing caseId or decision" },
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
