import { NextRequest, NextResponse } from "next/server";
import { FraudDAL } from "@/lib/dal/fraud";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const { id } = await context.params;

    const fraud = await FraudDAL.getByApplication(id);
    const timeline = await FraudDAL.getTimeline(id);

    return NextResponse.json({ data: { fraud, timeline } });
  } catch (err) {
    console.error("Fraud API Error:", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
