import { NextRequest, NextResponse } from "next/server";
import { DAL } from "@/lib/dal";

export async function GET(request: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const { id } = params;

    const signer = await DAL.Banking.Signer.getById(id);

    return NextResponse.json({ success: true, data: signer });
  } catch (err) {
    console.error("Signer Lookup Error:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
