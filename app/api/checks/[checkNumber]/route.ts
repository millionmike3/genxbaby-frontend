import { NextRequest, NextResponse } from "next/server";
import { DAL } from "@/lib/dal";

export async function GET(request: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const { checkNumber } = params;

    const check = await DAL.Banking.Check.getByCheckNumber(checkNumber);

    return NextResponse.json({ success: true, data: check });
  } catch (err) {
    console.error("Check Lookup Error:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
