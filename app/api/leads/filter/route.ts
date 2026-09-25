import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// TODO: Replace with your DAL query
async function getFilteredLeads(filters: any) {
  return [];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters = {
      hardshipBand: searchParams.get("hardshipBand") ?? undefined,
      investorPotentialBand: searchParams.get("investorPotentialBand") ?? undefined,
      impulsivityBand: searchParams.get("impulsivityBand") ?? undefined,
      status: searchParams.get("status") ?? undefined,
    };

    const leads = await getFilteredLeads(filters);

    return NextResponse.json(
      {
        success: true,
        data: leads ?? [],
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("LEADS FILTER ERROR:", err);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: "Use /api/leads/import for CSV uploads",
    },
    { status: 400 }
  );
}
