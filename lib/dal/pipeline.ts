import { prisma } from "@/lib/prisma";

export const PipelineDAL = {
  async getEvents(applicationId: string) {
    return prisma.pipelineEvent.findMany({
      where: { applicationId },
      orderBy: { timestamp: "asc" },
    });
  },

  async addEvent(applicationId: string, stage: string) {
    return prisma.pipelineEvent.create({
      data: { applicationId, stage },
    });
  },

  async getAll() {
    return prisma.pipelineEvent.findMany({
      orderBy: { timestamp: "asc" },
    });
  },
};
