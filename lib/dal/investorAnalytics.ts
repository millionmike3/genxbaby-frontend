import { prisma } from "@/lib/prisma";

export const InvestorAnalyticsDAL = {
  async getPortfolio(investorId: string) {
    return prisma.application.findMany({
      where: { investorId },
      include: {
        scoring: { orderBy: { createdAt: "desc" }, take: 1 },
        fraud: { orderBy: { createdAt: "desc" }, take: 1 },
        pricing: true,
        underwriting: true,
        servicing: true,
      },
    });
  },
};
