import { Application, UnderwritingPipelineOutput } from "@prisma/client";
import { prisma } from "@/lib/prisma";

import { emitUnderwritingEvent } from "@/app/api/underwriting/[applicationId]/events/route";
import { emitAdminPipelineEvent } from "@/app/api/admin/pipeline/events/route";

/**
 * Computes the milestone for an application based on:
 * - Application status
 * - Underwriting case status/decision
 * - Document progress (pipeline output)
 */
export function computeMilestone(
  app: Application & { underwritingCase?: any },
  pipeline: UnderwritingPipelineOutput
): string {
  if (app.status === "SUBMITTED") return "Application Submitted";
  if (app.status === "PROCESSING") return "In Processing";

  if (app.underwritingCase?.status === "IN_REVIEW") return "In Underwriting";
  if (app.underwritingCase?.decision === "APPROVE") return "Conditional Approval";

  if (pipeline.docsRequired > 0 && pipeline.docsSatisfied < pipeline.docsRequired)
    return "Docs In Progress";

  if (pipeline.docsRequired > 0 && pipeline.docsSatisfied === pipeline.docsRequired)
    return "Docs Complete";

  if (
    app.underwritingCase?.decision === "APPROVE" &&
    pipeline.docsSatisfied === pipeline.docsRequired
  ) {
    return "Clear to Close";
  }

  return app.milestone;
}

/**
 * Recomputes pipeline document progress:
 * docsRequired, docsSatisfied, docsPercent
 */
export async function recomputePipeline(applicationId: string) {
  const required = await prisma.documentRequirement.count({
    where: { applicationId, required: true },
  });

  const satisfied = await prisma.documentRequirement.count({
    where: { applicationId, required: true, satisfied: true },
  });

  const percent = required > 0 ? (satisfied / required) * 100 : 0;

  const pipeline = await prisma.underwritingPipelineOutput.upsert({
    where: { applicationId },
    create: {
      applicationId,
      docsRequired: required,
      docsSatisfied: satisfied,
      docsPercent: percent,
    },
    update: {
      docsRequired: required,
      docsSatisfied: satisfied,
      docsPercent: percent,
    },
  });

  // Underwriter dashboard SSE
  emitUnderwritingEvent(applicationId, {
    type: "DOC_PROGRESS_UPDATED",
    applicationId,
    docsRequired: pipeline.docsRequired,
    docsSatisfied: pipeline.docsSatisfied,
    docsPercent: pipeline.docsPercent,
  });

  // Admin pipeline dashboard SSE
  emitAdminPipelineEvent({
    type: "DOC_PROGRESS_UPDATED",
    applicationId,
    docsRequired: pipeline.docsRequired,
    docsSatisfied: pipeline.docsSatisfied,
    docsPercent: pipeline.docsPercent,
  });

  return pipeline;
}

/**
 * Updates the milestone in the database and emits SSE events.
 */
export async function updateMilestone(applicationId: string) {
  const app = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      underwritingCase: true,
      pipelineOutput: true,
    },
  });

  if (!app || !app.pipelineOutput) return null;

  const milestone = computeMilestone(app, app.pipelineOutput);

  const updated = await prisma.application.update({
    where: { id: applicationId },
    data: { milestone },
  });

  // Underwriter dashboard SSE
  emitUnderwritingEvent(applicationId, {
    type: "MILESTONE_UPDATED",
    applicationId,
    milestone,
  });

  // Admin pipeline dashboard SSE
  emitAdminPipelineEvent({
    type: "MILESTONE_UPDATED",
    applicationId,
    milestone: updated.milestone,
  });

  return updated;
}

/**
 * Unified function:
 * - Recomputes pipeline progress
 * - Recomputes milestone
 * - Emits all SSE events
 */
export async function recomputeAll(applicationId: string) {
  const pipeline = await recomputePipeline(applicationId);
  const milestone = await updateMilestone(applicationId);

  const app = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { underwritingCase: true },
  });

  if (app?.underwritingCase) {
    emitAdminPipelineEvent({
      type: "UNDERWRITING_UPDATED",
      applicationId,
      case: app.underwritingCase,
    });
  }

  return { pipeline, milestone };
}
