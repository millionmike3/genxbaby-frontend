import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateChecklistForApplication } from "@/lib/checklistEngine";

export const dynamic = "force-dynamic";

/**
 * GET — Fetch existing checklist items for an application
 */
export async function GET(
  _req: Request,
  { params }: { params: { applicationId: string } }
) {
  const docs = await prisma.documentRequirement.findMany({
    where: { applicationId: params.applicationId },
    orderBy: { required: "desc" },
  });

  return NextResponse.json({ success: true, documents: docs });
}

/**
 * POST — Generate a new dynamic checklist for an application
 */
export async function POST(
  _req: Request,
  { params }: { params: { applicationId: string } }
) {
  const created = await generateChecklistForApplication(params.applicationId);

  if (!created) {
    return NextResponse.json(
      { success: false, error: "Application not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, documents: created });
}
