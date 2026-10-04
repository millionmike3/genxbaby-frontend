import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendDocuSignEnvelope } from "@/lib/docusign";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: { applicationId: string } }
) {
  const appId = params.applicationId;
  const body = await req.json();
  const { recipientEmail, recipientName } = body;

  const docs = await prisma.documentRequirement.findMany({
    where: { applicationId: appId, includeInClosing: true },
  });

  const payloadDocs = docs
    .map((d) => (d.fileUrl ? { name: d.label, url: d.fileUrl } : null))
    .filter(Boolean) as { name: string; url: string }[];

  await sendDocuSignEnvelope(appId, recipientEmail, recipientName, payloadDocs);

  return NextResponse.json({ success: true });
}
