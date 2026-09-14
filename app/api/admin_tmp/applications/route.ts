import { NextRequest,  NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") ?? 50);

    const apps = await prisma.application.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        status: true,
        loanAmount: true,
        propertyAddress: true,
        behaviorScore: true,
        fraudScore: true,
        underwritingScore: true,
        createdAt: true,
        borrower: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: apps });
  } catch (err) {
    console.error("Admin Applications Error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
