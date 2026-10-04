import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // TODO: replace with real auth
    const loanOfficerId = "LOAN_OFFICER_ID_FROM_AUTH";

    const loanOfficer = await prisma.loanOfficer.findUnique({
      where: { id: loanOfficerId },
      include: {
        applications: {
          include: {
            borrower: true,
            underwritingCase: true,
            pipelineOutput: true,
          },
        },
      },
    });

    if (!loanOfficer) {
      return NextResponse.json(
        { success: false, error: "Loan officer not found" },
        { status: 404 }
      );
    }

    const apps = loanOfficer.applications.map((app) => ({
      id: app.id,
      borrowerName: app.borrower.fullName ?? "Unknown",
      borrowerEmail: app.borrower.email ?? "Unknown",
      loanAmount: app.loanAmount,
      status: app.status,
      milestone: app.milestone,
      docsRequired: app.pipelineOutput?.docsRequired ?? 0,
      docsSatisfied: app.pipelineOutput?.docsSatisfied ?? 0,
      uwStatus: app.underwritingCase?.status ?? null,
    }));

    return NextResponse.json({
      success: true,
      data: {
        id: loanOfficer.id,
        name: loanOfficer.name,
        email: loanOfficer.email,
        applications: apps,
      },
    });
  } catch (err) {
    console.error("Loan Officer Dashboard Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
