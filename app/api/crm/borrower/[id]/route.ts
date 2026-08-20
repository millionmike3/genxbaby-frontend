import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const borrower = await prisma.lead.findUnique({
    where: { id },
    include: {
      contactAttempts: true,
    },
  });

  if (!borrower) {
    return NextResponse.json(
      { error: "Borrower not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ borrower });
}
