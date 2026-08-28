import { prisma } from "@/lib/db/prisma";

export async function convertLeadToInvestor(leadId: string) {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
  });

  if (!lead) throw new Error("Lead not found");

  // Cast scores to a typed object
  const scores = lead.scores as {
    investorPotentialBand?: string;
    equityEstimate?: number;
    investorPotentialScore?: number;
    investorNotes?: string;
    phone?: string;
    status?: string;
  };

  // Basic eligibility rules
  const eligible =
    scores.investorPotentialBand === "high" ||
    (scores.equityEstimate && scores.equityEstimate > 150000);

  if (!eligible) {
    throw new Error("Lead is not eligible for investor conversion");
  }

  // Create investor profile
  const investor = await prisma.investor.create({
    data: {
      id: crypto.randomUUID(),
      name: lead.name,
      email: lead.email ?? null,
      phone: scores.phone ?? null,

      investorPotentialScore: scores.investorPotentialScore ?? 0,
      investorPotentialBand: scores.investorPotentialBand ?? "low",
      notes: scores.investorNotes ?? null,
    },
  });

  // Update lead status inside scores JSON
  await prisma.lead.update({
    where: { id: leadId },
    data: {
      scores: {
        ...scores,
        status: "converted",
        convertedAt: new Date().toISOString(),
      },
    },
  });

  return investor;
}
