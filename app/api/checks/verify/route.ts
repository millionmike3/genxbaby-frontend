import { NextRequest,  NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const body = await request.json();
    const { checkNumber, routingNumber, accountNumber } = body;

    const check = await prisma.check.findFirst({
      where: {
        checkNumber,
        routingNumber,
        accountNumber,
      },
      select: {
        id: true,
        amount: true,
        status: true,
        bankProfileId: true,
        signerId: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: check ?? null });
  } catch (err) {
    console.error("Check Verify Error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
