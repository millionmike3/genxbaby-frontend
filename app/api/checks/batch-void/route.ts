import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { generateCheckPdf } from "@/lib/pdf/checkGenerator";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  try {
    const { checkIds } = await request.json();

    if (!checkIds || !Array.isArray(checkIds) || checkIds.length === 0) {
      return NextResponse.json(
        { error: "No check IDs provided" },
        { status: 400 }
      );
    }

    const prisma = await getPrisma();

    const result = await prisma.check.updateMany({
      where: { id: { in: checkIds } },
      data: { status: "voided" },
    });

    return NextResponse.json({
      success: true,
      voidedCount: result.count,
      message: `${result.count} checks voided successfully`,
    });
  } catch (error) {
    console.error("Batch VOID error:", error);
    return NextResponse.json(
      { error: "Failed to void checks" },
      { status: 500 }
    );
  }
}
