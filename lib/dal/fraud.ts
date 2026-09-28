
// lib/dal/fraud.ts
export async function getFraudForApplication(appId: string) {
  const { prisma } = await import("@/lib/prisma");

  return prisma.fraudEvent.findMany({
    where: { applicationId: appId },
    orderBy: { createdAt: "desc" },
  });
}

export const FraudDAL = {
  async getByApplication(applicationId: string) {
    return prisma.fraud.findUnique({
      where: { applicationId },
    });
  },

  async save(applicationId: string, data: any) {
    return prisma.fraud.upsert({
      where: { applicationId },
      update: data,
      create: { applicationId, ...data },
    });
  },

  async addTimelineEvent(applicationId: string, label: string) {
    return prisma.fraudTimeline.create({
      data: { applicationId, label },
    });
  },

  async getTimeline(applicationId: string) {
    return prisma.fraudTimeline.findMany({
      where: { applicationId },
      orderBy: { timestamp: "asc" },
    });
  },
};
