import { prisma } from "@/lib/prisma";

export const BehaviorDAL = {
  async collect(applicationId: string, data: any) {
    return prisma.behaviorEvent.create({
      data: { applicationId, ...data },
    });
  },

  async getEvents(applicationId: string) {
    return prisma.behaviorEvent.findMany({
      where: { applicationId },
      orderBy: { timestamp: "asc" },
    });
  },

  async saveProfile(applicationId: string, profile: any) {
    return prisma.behaviorProfile.upsert({
      where: { applicationId },
      update: profile,
      create: { applicationId, ...profile },
    });
  },

  async getProfile(applicationId: string) {
    return prisma.behaviorProfile.findUnique({
      where: { applicationId },
    });
  },
};
