import { getPrisma } from "@/lib/db/prisma";

export const InvestorAnalyticsDAL = {
  async getPortfolio(investorId: string) {
    const prisma = await getPrisma();

    return prisma.application.findMany({
      where: { investorId },
      include: {
        aiScoring: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        fraudEvents: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        pricing: true,
        underwriting: true,
        servicing: true,
      },
    });
  },
};
