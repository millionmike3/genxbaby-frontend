import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const investors = await prisma.investor.findMany({
    orderBy: { investorPotentialScore: "desc" },
  });

  return Response.json(investors);
}
