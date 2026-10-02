import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const form = await req.formData();
  const id = Number(form.get("id"));

  // Approve the request
  const request = await prisma.investorFundingRequest.update({
    where: { id },
    data: { status: "APPROVED" },
  });

  // Fetch latest equity snapshot
  const latestSnapshot = await prisma.investorEquitySnapshot.findFirst({
    where: { investorId: request.investorId },
    orderBy: { createdAt: "desc" },
  });

  const previousEquity = latestSnapshot?.totalEquity ?? 0;

  // Create new equity snapshot after approval
  await prisma.investorEquitySnapshot.create({
    data: {
      investorId: request.investorId,
      totalEquity:
        request.type === "CONTRIBUTION"
          ? previousEquity + request.amount
          : previousEquity - request.amount,
    },
  });

  // Notify investor
  await prisma.investorNotification.create({
    data: {
      investorId: request.investorId,
      title: "Funding Request Approved",
      message: `Your ${request.type.toLowerCase()} request for $${request.amount.toLocaleString()} has been approved.`,
    },
  });
  await prisma.investorMessage.create({
  data: {
    investorId: request.investorId,
    sender: "admin",
    subject: "Funding Request Update",
    body: `Your request has been ${request.status.toLowerCase()}.`,
  },
  });

  return NextResponse.redirect("/admin/funding");
}
