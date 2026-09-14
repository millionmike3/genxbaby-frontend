import { prisma } from "@/lib/prisma";

export const LeadDAL = {
  getLeadById: async (leadId: string) => {
    return prisma.lead.findUnique({
      where: { id: leadId },
      include: { user: true },
    });
  },

  getLeadWithScores: async (leadId: string) => {
    return prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        user: true,

        scoreRecords: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            applicationId: true,
            userId: true,

            fraudScore: true,
            riskScore: true,
            impulsivenessScore: true,
            factors: true,
            signals: true,
            metadata: true,
          },
        },

        ScoringResult: true,
      },
    });
  },

  listLeads: async () => {
    return prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });
  },
};
