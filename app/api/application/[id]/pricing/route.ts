import { NextRequest, NextResponse } from "next/server";
import { PricingDAL } from "@/lib/dal/pricing";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const { id } = await context.params;

    const pricing = await PricingDAL.getByApplication(id);
    const timeline = await PricingDAL.getTimeline(id);

    return NextResponse.json({ data: { pricing, timeline } });
  } catch (err) {
    console.error("Pricing API Error:", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
