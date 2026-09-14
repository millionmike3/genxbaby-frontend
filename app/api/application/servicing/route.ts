import { NextRequest, NextResponse } from "next/server";
import { DAL } from "@/lib/dal";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const { id } = await context.params;

    const servicing = await DAL.Application.Servicing.getServicing(id);

    return NextResponse.json({ success: true, data: servicing });
  } catch (err) {
    console.error("Application Servicing API Error:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
