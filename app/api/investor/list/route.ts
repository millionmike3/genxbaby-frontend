import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  const prisma = await getPrisma();

  const investors = await prisma.investor.findMany({
    orderBy: { investorPotentialScore: "desc" },
  });

  return NextResponse.json(investors);
}
