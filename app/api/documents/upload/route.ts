import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DocumentDAL } from "@/lib/dal/document";
import { recomputeAll } from "@/lib/milestoneEngine";
import { saveFileToStorage } from "@/lib/storage"; // implement however you want

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // Support BOTH JSON uploads (DAL) and FormData uploads (checklist auto-satisfy)
  const contentType = req.headers.get("content-type") || "";

  // -----------------------------
  // CASE 1: Borrower uploads file (FormData)
  // -----------------------------
  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();

    const file = form.get("file") as File;
    const docId = form.get("docId") as string;
    const applicationId = form.get("applicationId") as string;

    if (!file || !docId || !applicationId) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    // Save file to storage (S3, local, etc.)
    const fileUrl = await saveFileToStorage(
      file,
      `docs/${applicationId}/${docId}`
    );

    // Mark checklist item satisfied
    const updatedDoc = await prisma.documentRequirement.update({
      where: { id: docId },
      data: {
        satisfied: true,
        fileUrl,
      },
    });

    // Recompute pipeline + milestone + SSE
    await recomputeAll(applicationId);

    return NextResponse.json({
      success: true,
      document: updatedDoc,
    });
  }

  // -----------------------------
  // CASE 2: JSON-based document creation (DAL)
  // -----------------------------
  const body = await req.json();

  const doc = await DocumentDAL.create({
    applicationId: body.applicationId,
    borrowerId: body.borrowerId,
    investorId: body.investorId,
    name: body.name,
    type: body.type,
    url: body.url,
    metadata: body.metadata,
  });

  return NextResponse.json({ success: true, data: doc });
}
