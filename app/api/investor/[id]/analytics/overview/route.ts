import { NextRequest, NextResponse } from "next/server";
import { InvestorAnalyticsDAL } from "@/lib/dal/investorAnalytics";
import { computeInvestorAnalytics } from "@/lib/engines/investorAnalytics";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const { id } = await context.params;

    const portfolio = await InvestorAnalyticsDAL.getPortfolio(id);
    const analytics = computeInvestorAnalytics(portfolio);

    return NextResponse.json({ data: analytics });
  } catch (err) {
    console.error("Investor Analytics API Error:", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
