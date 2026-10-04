import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { recomputeAll } from "@/lib/milestoneEngine";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json();
  const { applicationId, conditionId, action } = body;

  let data: any = {};

  if (action === "SATISFY") data = { satisfied: true, waived: false };
  if (action === "WAIVE") data = { waived: true, satisfied: false };
  if (action === "REOPEN") data = { waived: false, satisfied: false };

  await prisma.documentRequirement.update({
    where: { id: conditionId },
    data,
  });

  await recomputeAll(applicationId);

  return NextResponse.json({ success: true });
}
