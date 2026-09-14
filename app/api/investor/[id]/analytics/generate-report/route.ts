import { NextRequest, NextResponse } from "next/server";
import { InvestorAnalyticsDAL } from "@/lib/dal/investorAnalytics";
import { computeInvestorAnalytics } from "@/lib/engines/investorAnalytics";
import { DocumentDAL } from "@/lib/dal/document";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const { id } = await context.params;

    const portfolio = await InvestorAnalyticsDAL.getPortfolio(id);
    const analytics = computeInvestorAnalytics(portfolio);

    const url = await generateInvestorReport(analytics);

    const doc = await DocumentDAL.create({
      investorId: id,
      name: "Investor Analytics Report",
      type: "investor-report",
      url,
    });

    return NextResponse.json({ data: doc });
  } catch (err) {
    console.error("Investor Report Generation Error:", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function generateInvestorReport(analytics: any) {
  return `https://storage.example.com/investor/${crypto.randomUUID()}.pdf`;
}
