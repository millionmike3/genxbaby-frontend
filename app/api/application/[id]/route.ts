import { NextRequest, NextResponse } from "next/server";
import { DAL } from "@/lib/dal";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const { id } = await context.params;

    const app = await DAL.Application.Basic.getById(id);

    return NextResponse.json({ success: true, data: app });
  } catch (err) {
    console.error("Application API Error:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
