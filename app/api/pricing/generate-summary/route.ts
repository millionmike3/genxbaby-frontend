import { NextRequest,  NextResponse } from "next/server";
import { PricingDAL } from "@/lib/dal/pricing";
import { DocumentDAL } from "@/lib/dal/document";

export async function POST(request: NextRequest, { params }: { params: Record<string, string> }) {
  const { applicationId } = await request.json();

  const pricing = await PricingDAL.getByApplication(applicationId);

  const url = await generatePricingSummary(pricing);

  const doc = await DocumentDAL.create({
    applicationId,
    name: "Pricing Summary",
    type: "pricing-summary",
    url,
  });

  return NextResponse.json({ data: doc });
}

async function generatePricingSummary(pricing: any) {
  return `https://storage.example.com/pricing/${crypto.randomUUID()}.pdf`;
}
