import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { applicationId, type, metadata } = body;

  await prisma.timelineEvent.create({
    data: { applicationId, type, metadata },
  });

  return NextResponse.json({ ok: true });
}
