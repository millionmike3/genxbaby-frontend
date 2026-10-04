import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emitUnderwritingEvent } from "@/app/api/underwriting/[applicationId]/events/route";

export async function POST(
  req: Request,
  { params }: { params: { documentId: string } }
) {
  try {
    const { documentId } = params;
    const body = await req.json();

    const { status, notes } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, error: "Missing status" },
        { status: 400 }
      );
    }

    // Fetch document first (needed for SSE + applicationId)
    const existing = await prisma.borrowerDocument.findUnique({
      where: { id: documentId },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Document not found" },
        { status: 404 }
      );
    }

    // Update document
    const updated = await prisma.borrowerDocument.update({
      where: { id: documentId },
      data: {
        status,
        notes: notes ?? existing.notes,
      },
    });

    // Emit real-time event to borrower, loan officer, underwriter dashboards
    emitUnderwritingEvent(existing.applicationId, {
      type: "DOC_STATUS_UPDATED",
      document: updated,
    });

    return NextResponse.json({
      success: true,
      document: updated,
    });
  } catch (err) {
    console.error("Document Status Update Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
