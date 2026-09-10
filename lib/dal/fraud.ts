import { prisma } from "@/lib/prisma";

export const FraudDAL = {
  saveFraudScore: async (
    userId: string,
    fraudScore: number,
    rawData: any,
    anchorTxHash?: string
  ) => {
    return prisma.fraudScore.create({
      data: {
        userId,
        fraudScore,
        rawData,
        anchorTxHash,
      },
    });
  },

  logFraudEvent: async (
    userId: string,
    event: any,
    anchorTxHash?: string
  ) => {
    return prisma.fraudEvent.create({
      data: {
        userId,
        ...event,
        anchorTxHash,
      },
    });
  },

  getFraudEventsForUser: async (userId: string) => {
    return prisma.fraudEvent.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  // Optional alias if you want a shorter name
  getFraudEvents: async (userId: string) => {
    return prisma.fraudEvent.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },
};
