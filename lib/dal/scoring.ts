import { prisma } from "@/lib/prisma";

export const ScoringDAL = {
  async getByApplication(applicationId: string) {
    return prisma.scoring.findMany({
      where: { applicationId },
      orderBy: { createdAt: "desc" },
    });
  },

  async getLatest(applicationId: string) {
    return prisma.scoring.findFirst({
      where: { applicationId },
      orderBy: { createdAt: "desc" },
    });
  },

  async save(applicationId: string, data: any) {
    return prisma.scoring.create({
      data: { applicationId, ...data },
    });
  },

  async addTimelineEvent(applicationId: string, label: string) {
    return prisma.scoringTimeline.create({
      data: { applicationId, label },
    });
  },

  async getTimeline(applicationId: string) {
    return prisma.scoringTimeline.findMany({
      where: { applicationId },
      orderBy: { timestamp: "asc" },
    });
  },
};
