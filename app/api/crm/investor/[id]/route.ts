import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const investor = await prisma.investor.findUnique({
    where: { id },
    include: {
      behavior: true,
    },
  });

  if (!investor) {
    return NextResponse.json(
      { error: "Investor not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ investor });
}
