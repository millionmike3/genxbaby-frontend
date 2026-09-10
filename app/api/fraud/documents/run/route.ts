import { NextResponse } from "next/server";
import { analyzeDocumentFraud } from "@/lib/services/fraudDocuments";

export async function POST(req: Request) {
  const body = await req.json();
  const documentId = body.documentId;

  const result = await analyzeDocumentFraud(documentId);

  return NextResponse.json(result);
}
