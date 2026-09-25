import { NextRequest, NextResponse } from "next/server";
import { DAL } from "@/lib/dal"; // your DAL index barrel

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { applicationId } = body;

    if (!applicationId) {
      return NextResponse.json(
        { error: "applicationId is required" },
        { status: 400 }
      );
    }

    // ⭐ FIX — use the new DAL underwriting engine
    const decision = await DAL.Underwriting.decide(applicationId);

    return NextResponse.json({ success: true, decision });
  } catch (err) {
    console.error("AUTO UNDERWRITING ERROR:", err);
    return NextResponse.json(
      { error: "Failed to generate underwriting decision" },
      { status: 500 }
    );
  }
}
