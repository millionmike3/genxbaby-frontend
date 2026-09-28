export const BehaviorDAL = {
  async collect(applicationId: string, data: any) {
    const { prisma } = await import("@/lib/prisma");

    return prisma.behaviorEvent.create({
      data: { applicationId, ...data },
    });
  },

  async getEvents(applicationId: string) {
    const { prisma } = await import("@/lib/prisma");

    return prisma.behaviorEvent.findMany({
      where: { applicationId },
      orderBy: { timestamp: "asc" },
    });
  },

  async saveProfile(applicationId: string, profile: any) {
    const { prisma } = await import("@/lib/prisma");

    return prisma.behaviorProfile.upsert({
      where: { applicationId },
      update: profile,
      create: { applicationId, ...profile },
    });
  },

  async getProfile(applicationId: string) {
    const { prisma } = await import("@/lib/prisma");

    return prisma.behaviorProfile.findUnique({
      where: { applicationId },
    });
  },
};
