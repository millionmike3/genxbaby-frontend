import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const { id } = params;

    const prisma = await getPrisma();

    const doc = await prisma.document.findUnique({
      where: { id },
      select: {
        id: true,
        type: true,
        url: true,
        fraudScore: true,
        fraudSignals: true,
        embedColor: true,
        metadata: true,
        createdAt: true,

        classifications: {
          select: {
            id: true,
            category: true,
            confidence: true,
            metadata: true,
          },
        },

        ocrExtractions: {
          select: {
            id: true,
            text: true,
            fields: true,
            confidence: true,
            metadata: true,
          },
        },

        complianceScore: {
          select: {
            id: true,
            score: true,
            issues: true,
            metadata: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: doc });
  } catch (err) {
    console.error("Document Lookup Error:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
