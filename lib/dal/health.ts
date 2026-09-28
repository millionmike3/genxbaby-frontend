import { getPrisma } from "@/lib/db/prisma";

export const HealthDAL = {
  async logEvent(type: string, data: any) {
    const prisma = await getPrisma();

    return prisma.systemEvent.create({
      data: { type, data },
    });
  },

  async getEvents(limit = 100) {
    const prisma = await getPrisma();

    return prisma.systemEvent.findMany({
      orderBy: { timestamp: "desc" },
      take: limit,
    });
  },

  async getErrors(limit = 100) {
    const prisma = await getPrisma();

    return prisma.systemEvent.findMany({
      where: { type: "error" },
      orderBy: { timestamp: "desc" },
      take: limit,
    });
  },

  async getAnomalies(limit = 100) {
    const prisma = await getPrisma();

    return prisma.systemEvent.findMany({
      where: { type: "anomaly" },
      orderBy: { timestamp: "desc" },
      take: limit,
    });
  },
};
