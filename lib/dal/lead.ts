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
        scoringResults: { orderBy: { createdAt: "desc" } },
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
