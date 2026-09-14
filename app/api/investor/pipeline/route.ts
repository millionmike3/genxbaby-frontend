import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const deals = await prisma.pipelineDeal.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(deals);
}
