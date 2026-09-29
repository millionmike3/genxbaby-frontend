import { getPrisma } from "@/lib/prisma";

export const EnvironmentDAL = {
  async getHeatmap(locationId?: string) {
    const prisma = getPrisma();

    return prisma.environmentReading.findMany({
      where: locationId ? { locationId } : {},
      orderBy: { timestamp: "desc" },
    });
  },

  async saveReading(locationId: string, metrics: {
    deviceCount: number;
    bluetoothDensity: number;
    timestamp: Date;
    riskScore?: number;
    age?: number;
    incomeVolatility?: number;
    ipReputation?: string;
  }) {
    const prisma = getPrisma();

    return prisma.environmentReading.create({
      data: {
        locationId,
        deviceCount: metrics.deviceCount,
        bluetoothDensity: metrics.bluetoothDensity,
        timestamp: metrics.timestamp,
        riskScore: metrics.riskScore ?? 0,
        age: metrics.age ?? null,
        incomeVolatility: metrics.incomeVolatility ?? null,
        ipReputation: metrics.ipReputation ?? null,
      },
    });
  }
};
