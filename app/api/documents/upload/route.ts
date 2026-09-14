import { NextRequest,  NextResponse } from "next/server";
import { DocumentDAL } from "@/lib/dal/document";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  const body = await request.json();

  const doc = await DocumentDAL.create({
    applicationId: body.applicationId,
    borrowerId: body.borrowerId,
    investorId: body.investorId,
    name: body.name,
    type: body.type,
    url: body.url,
    metadata: body.metadata,
  });

  return NextResponse.json({ data: doc });
}
