import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { recomputeAll } from "@/lib/milestoneEngine";

export const dynamic = "force-dynamic";

export async function POST(
  _req: Request,
  { params }: { params: { applicationId: string } }
) {
  const { applicationId } = params;

  const app = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { underwritingCase: true, pipelineOutput: true },
  });

  if (!app) {
    return NextResponse.json(
      { success: false, error: "Application not found" },
      { status: 404 }
    );
  }

  const po = app.pipelineOutput;
  const docsComplete =
    po && po.docsRequired > 0 && po.docsSatisfied === po.docsRequired;

  const approved = app.underwritingCase?.decision === "APPROVE";

  if (!approved || !docsComplete) {
    return NextResponse.json(
      {
        success: false,
        error: "Cannot mark Clear to Close until approved and docs complete",
      },
      { status: 400 }
    );
  }

  const updated = await prisma.application.update({
    where: { id: applicationId },
    data: {
      status: "CLEAR_TO_CLOSE",
      milestone: "Clear to Close",
    },
  });

  await recomputeAll(applicationId);

  return NextResponse.json({ success: true, application: updated });
}
