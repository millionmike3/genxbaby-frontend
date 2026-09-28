// lib/dal/scoring.ts
import { getPrisma } from "@/lib/db/prisma";

/**
 * Legacy scoring fetcher
 */
export async function getScoring(appId: string) {
  const prisma = await getPrisma();

  return prisma.scoringResult.findMany({
    where: { applicationId: appId },
    orderBy: { createdAt: "desc" },
  });
}

export const ScoringDAL = {
  async getByApplication(applicationId: string) {
    const prisma = await getPrisma();

    return prisma.scoreRecord.findMany({
      where: { applicationId },
      orderBy: { createdAt: "desc" },
    });
  },

  async getLatest(applicationId: string) {
    const prisma = await getPrisma();

    return prisma.scoreRecord.findFirst({
      where: { applicationId },
      orderBy: { createdAt: "desc" },
    });
  },

  async getRecentScores(limit: number, since: Date) {
    const prisma = await getPrisma();

    return prisma.scoreRecord.findMany({
      where: {
        createdAt: {
          gte: since,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  },

  async save(applicationId: string, data: any) {
    const prisma = await getPrisma();

    return prisma.scoreRecord.create({
      data: { applicationId, ...data },
    });
  },

  async addTimelineEvent(applicationId: string, type: string) {
    const prisma = await getPrisma();

    return prisma.timelineEvent.create({
      data: { applicationId, type },
    });
  },

  async getTimeline(applicationId: string) {
    const prisma = await getPrisma();

    return prisma.applicationMilestone.findMany({
      where: { applicationId },
      orderBy: { timestamp: "asc" },
    });
  },
};
