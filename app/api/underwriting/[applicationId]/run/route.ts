import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runUnderwritingEngine } from "@/lib/underwritingEngine";
import { emitUnderwritingEvent } from "@/app/api/underwriting/[applicationId]/events/route";

export async function POST(
  req: Request,
  { params }: { params: { applicationId: string } }
) {
  try {
    const { applicationId } = params;

    const app = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        underwritingCase: true,
      },
    });

    if (!app) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    const result = runUnderwritingEngine(app);

    const updatedCase = await prisma.underwritingCase.update({
      where: { applicationId },
      data: {
        ausFinding: result.ausFinding,
        decision: result.decision,
        conditions: JSON.stringify(result.conditions),
        status: "IN_REVIEW",
      },
    });
     emitUnderwritingEvent(applicationId, {
     type: "UNDERWRITING_UPDATED",
     case: updatedCase,
      });

    return NextResponse.json({
      success: true,
      data: {
        underwritingCase: updatedCase,
        aus: result,
      },
    });
  } catch (err) {
    console.error("Underwriting Engine Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
