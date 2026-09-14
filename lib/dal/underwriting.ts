import { prisma } from "@/lib/prisma";

export const UnderwritingDAL = {
  async getByApplication(applicationId: string) {
    return prisma.underwriting.findUnique({
      where: { applicationId },
    });
  },

  async save(applicationId: string, data: any) {
    return prisma.underwriting.upsert({
      where: { applicationId },
      update: data,
      create: { applicationId, ...data },
    });
  },

  async addTimelineEvent(applicationId: string, label: string) {
    return prisma.underwritingTimeline.create({
      data: { applicationId, label },
    });
  },

  async getTimeline(applicationId: string) {
    return prisma.underwritingTimeline.findMany({
      where: { applicationId },
      orderBy: { timestamp: "asc" },
    });
  },
};
