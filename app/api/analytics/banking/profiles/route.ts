import { NextRequest,  NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const profiles = await prisma.bankProfile.findMany({
      select: {
        id: true,
        name: true,
        bankName: true,
        routingNumber: true,
        accountNumber: true,
        riskScore: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    return NextResponse.json({ success: true, data: profiles });
  } catch (err) {
    console.error("Banking Profiles Analytics Error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
