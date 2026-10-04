import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { applicationId: string } }
) {
  const appId = params.applicationId;

  const docs = await prisma.documentRequirement.findMany({
    where: { applicationId: appId, includeInClosing: true },
  });

  // Here you’d use pdf-lib or similar to merge PDFs.
  // For now, just return list of URLs.
  const urls = docs.map((d) => d.fileUrl).filter(Boolean);

  return NextResponse.json({ success: true, urls });
}
