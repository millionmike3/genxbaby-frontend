import { NextRequest, NextResponse } from "next/server";
import { getFraudForApplication } from "@/lib/dal/fraud";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const events = await getFraudForApplication(id);

    return NextResponse.json({ success: true, data: events });
  } catch (err) {
    console.error("Application Fraud Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
