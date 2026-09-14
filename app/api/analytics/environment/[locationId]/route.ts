import { NextRequest, NextResponse } from "next/server";
import { DAL } from "@/lib/dal";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const { locationId } = await context.params;

    const data = await DAL.Environment.Readings.getByLocation(locationId);

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Environment Analytics Error:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
