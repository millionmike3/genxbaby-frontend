import { NextRequest, NextResponse } from "next/server";
import { DocumentDAL } from "@/lib/dal/document";

export async function GET(request: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const { id } = params;

    const docs = await DocumentDAL.getByApplication(id);

    return NextResponse.json({ data: docs });
  } catch (err) {
    console.error("Documents API Error:", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
