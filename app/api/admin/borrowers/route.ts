"use server";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Load server-only modules at runtime
    const { prisma } = await import("@/lib/prisma");

    const borrowers = await prisma.borrower.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        createdAt: true,
        applications: {
          select: {
            id: true,
            loanAmount: true,
            status: true,
            underwritingScore: true,
            fraudScore: true,
            createdAt: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: borrowers });
  } catch (err) {
    console.error("Borrowers API Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
