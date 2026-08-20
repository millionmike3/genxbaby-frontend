import { prisma } from "@/lib/db/prisma";

export async function convertLeadToInvestor(leadId: string) {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
  });

  if (!lead) throw new Error("Lead not found");

  // Basic eligibility rules
  const eligible =
    lead.investorPotentialBand === "high" ||
    (lead.equityEstimate && lead.equityEstimate > 150000);

  if (!eligible) {
    throw new Error("Lead is not eligible for investor conversion");
  }

  // Create investor profile
  const investor = await prisma.investor.create({
    data: {
      id: crypto.randomUUID(),
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      createdAt: new Date(),
      updatedAt: new Date(),

      // Optional: carry over scoring metadata
      investorPotentialScore: lead.investorPotentialScore,
      investorPotentialBand: lead.investorPotentialBand,
      notes: lead.investorNotes,
    },
  });

  // Update lead status
  await prisma.lead.update({
    where: { id: leadId },
    data: {
      status: "converted",
      updatedAt: new Date(),
    },
  });

  return investor;
}
