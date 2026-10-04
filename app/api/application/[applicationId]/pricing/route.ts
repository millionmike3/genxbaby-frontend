import { NextRequest, NextResponse } from "next/server";
import { getPricing } from "@/lib/dal/pricing";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const pricing = await getPricing(id);

    return NextResponse.json({ success: true, data: pricing });
  } catch (err) {
    console.error("Application Pricing Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
