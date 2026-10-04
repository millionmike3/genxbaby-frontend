// app/api/lo/pipeline/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const applications = await prisma.application.findMany({
    include: {
      borrower: true,
      pipelineOutput: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, applications });
}
