import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  const prisma = await getPrisma();

  const deals = await prisma.pipelineDeal.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(deals);
}
