import { NextRequest, NextResponse } from "next/server";
import { getUnderwriting } from "@/lib/dal/underwriting";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await getUnderwriting(id);

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Underwriting Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
