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

        InvestorScoringResult: {
          orderBy: { createdAt: "desc" },
        },

        ScoringResult: true,
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
};
