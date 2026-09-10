import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { applicationId, type, url } = body;

  const doc = await prisma.document.create({
    data: { applicationId, type, url },
  });

  await prisma.timelineEvent.create({
    data: {
      applicationId,
      type: "DOC_UPLOADED",
      metadata: { type, url },
    },
  });

  return NextResponse.json({ ok: true, document: doc });
}
