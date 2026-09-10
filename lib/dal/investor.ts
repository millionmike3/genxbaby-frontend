import { prisma } from "@/lib/prisma";

export const InvestorDAL = {
  getInvestor: async (investorId: string) => {
    return prisma.investor.findUnique({
      where: { id: investorId },
    });
  },

  getInvestorWithScores: async (investorId: string) => {
    return prisma.investor.findUnique({
      where: { id: investorId },
      include: {
        scoringResults: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  },

  saveInvestorScore: async (
    investorId: string,
    riskScore: number,
    impulsivenessScore: number,
    rawData: any
  ) => {
    return prisma.investorScoringResult.create({
      data: {
        investorId,
        riskScore,
        impulsivenessScore,
        rawData,
      },
    });
  },
}; // ✅ THIS IS NOW VALID — object closes cleanly
