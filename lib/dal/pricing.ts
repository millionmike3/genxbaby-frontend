// lib/dal/pricing.ts
export async function getPricing(appId: string) {
  const { prisma } = await import("@/lib/prisma");

  return prisma.pricing.findMany({
    where: { applicationId: appId },
    orderBy: { createdAt: "desc" },
  });
}


export const PricingDAL = {
  async getByApplication(applicationId: string) {
    return prisma.pricing.findUnique({
      where: { applicationId },
    });
  },

  async save(applicationId: string, data: any) {
    return prisma.pricing.upsert({
      where: { applicationId },
      update: data,
      create: { applicationId, ...data },
    });
  },

  async addTimelineEvent(applicationId: string, label: string) {
    return prisma.pricingTimeline.create({
      data: { applicationId, label },
    });
  },

  async getTimeline(applicationId: string) {
    return prisma.pricingTimeline.findMany({
      where: { applicationId },
      orderBy: { timestamp: "asc" },
    });
  },
};
