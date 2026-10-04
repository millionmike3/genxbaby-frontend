import { prisma } from "@/lib/prisma";
import { recomputeAll } from "@/lib/milestoneEngine";
import { emitUnderwritingEvent } from "@/app/api/underwriting/[applicationId]/events/route";

export async function attemptClearToClose(applicationId: string) {
  const app = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      underwritingCase: true,
      pipelineOutput: true,
    },
  });

  if (!app || !app.pipelineOutput || !app.underwritingCase) return null;

  const po = app.pipelineOutput;
  const uw = app.underwritingCase;

  const docsComplete =
    po.docsRequired > 0 && po.docsSatisfied === po.docsRequired;
  const uwApproved = uw.decision === "APPROVE";

  if (!docsComplete || !uwApproved) {
    return { success: false, reason: "Conditions not satisfied" };
  }

  const updated = await prisma.application.update({
    where: { id: applicationId },
    data: {
      status: "CLEAR_TO_CLOSE",
      milestone: "Clear to Close",
    },
  });

  await recomputeAll(applicationId);

  emitUnderwritingEvent(applicationId, {
    type: "CLEAR_TO_CLOSE",
    applicationId,
  });

  return { success: true, application: updated };
}
