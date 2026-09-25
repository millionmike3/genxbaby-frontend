import { prisma } from "@/lib/prisma";

export const ScoringDAL = {
  async getByApplication(applicationId: string) {
    return prisma.scoreRecord.findMany({
      where: { applicationId },
      orderBy: { createdAt: "desc" },
    });
  },

  async getLatest(applicationId: string) {
    return prisma.scoreRecord.findFirst({
      where: { applicationId },
      orderBy: { createdAt: "desc" },
    });
  },

  async getRecentScores(limit: number, since: Date) {
    return prisma.scoreRecord.findMany({
      where: {
        createdAt: {
          gte: since
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      take: limit
    });
  },

  async save(applicationId: string, data: any) {
    return prisma.scoreRecord.create({
      data: { applicationId, ...data },
    });
  },

  async addTimelineEvent(applicationId: string, type: string) {
    return prisma.timelineEvent.create({
      data: { applicationId, type },
    });
  },

  async getTimeline(applicationId: string) {
    return prisma.applicationMilestone.findMany({
      where: { applicationId },
      orderBy: { timestamp: "asc" },
    });
  },
};
