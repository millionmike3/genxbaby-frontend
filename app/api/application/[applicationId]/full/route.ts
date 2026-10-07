import { NextRequest, NextResponse } from "next/server";
import { DAL } from "@/lib/dal";

export async function GET(request: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const { id } = params;

    const app = await DAL.Application.Full.getFull(id);

    return NextResponse.json({ success: true, data: app });
  } catch (err) {
    console.error("Application Full API Error:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
