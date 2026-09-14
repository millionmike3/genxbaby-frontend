import { NextRequest, NextResponse } from "next/server";
import { DAL } from "@/lib/dal";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const { id } = await context.params;

    const borrower = await DAL.Borrower.Basic.getById(id);
    const apps = await DAL.Borrower.Applications.getWithApplications(id);
    const analytics = await DAL.Borrower.Scores.getAnalytics(id);

    return NextResponse.json({
      success: true,
      data: { borrower, apps, analytics }
    });
  } catch (err) {
    console.error("Borrower API Error:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
