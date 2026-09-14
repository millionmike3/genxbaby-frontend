import { NextRequest,  NextResponse } from "next/server";
import { analyzeDocumentFraud } from "@/lib/services/fraudDocuments";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const body = await request.json();
  const documentId = body.documentId;

  const result = await analyzeDocumentFraud(documentId);

  return NextResponse.json(result);
}
