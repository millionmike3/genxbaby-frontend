import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const apps = await prisma.application.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        borrower: true,
        loanOfficer: true,
        underwritingCase: true,
        pipelineOutput: true,
      },
    });

    const rows = apps.map((a) => {
      const po = a.pipelineOutput;
      return {
        id: a.id,
        borrowerName:
          a.borrower?.firstName && a.borrower?.lastName
            ? `${a.borrower.firstName} ${a.borrower.lastName}`
            : a.borrower?.fullName ?? "Unknown",
        loanOfficerName: a.loanOfficer?.name ?? null,
        loanAmount: a.loanAmount,
        milestone: a.milestone,
        status: a.status,
        uwStatus: a.underwritingCase?.status ?? null,
        docsRequired: po?.docsRequired ?? 0,
        docsSatisfied: po?.docsSatisfied ?? 0,
        docsPercent: po?.docsPercent ?? 0,
      };
    });

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error("Admin pipeline error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
