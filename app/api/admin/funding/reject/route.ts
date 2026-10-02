import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const form = await req.formData();
  const id = Number(form.get("id"));

  const request = await prisma.investorFundingRequest.update({
    where: { id },
    data: { status: "REJECTED" },
  });

  await prisma.investorNotification.create({
    data: {
      investorId: request.investorId,
      title: "Funding Request Rejected",
      message: `Your ${request.type.toLowerCase()} request for $${request.amount.toLocaleString()} was not approved.`,
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
