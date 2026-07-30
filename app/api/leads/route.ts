import { NextResponse } from "next/server";
import { getFilteredLeads } from "@/lib/db/leads";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const filters = {
    hardshipBand: searchParams.get("hardshipBand") || undefined,
    investorPotentialBand: searchParams.get("investorPotentialBand") || undefined,
    impulsivityBand: searchParams.get("impulsivityBand") || undefined,
    status: searchParams.get("status") || undefined,
  };

  const leads = await getFilteredLeads(filters);

  return NextResponse.json(leads);
}

export async function POST() {
  return NextResponse.json({
    error: "Use /api/leads/import for CSV uploads",
  });
}
