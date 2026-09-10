import { prisma } from "@/lib/prisma";

export const ScoringDAL = {
  saveScores: async (
    userId: string,
    scores: { fraud: number; risk: number; impulsiveness: number },
    rawData: any
  ) => {
    return prisma.scoringResult.create({
      data: {
        userId,
        fraudScore: scores.fraud,
        riskScore: scores.risk,
        impulsivenessScore: scores.impulsiveness,
        rawData,
      },
    });
  },

  getScoresForUser: async (userId: string) => {
    return prisma.scoringResult.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  getLatestScores: async (userId: string) => {
    return prisma.scoringResult.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  getRecentScores: async (limit = 100, since?: Date) => {
    return prisma.scoringResult.findMany({
      where: since ? { createdAt: { gte: since } } : {},
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  },
};
