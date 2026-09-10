import { prisma } from "@/lib/prisma";

export const EnvironmentDAL = {
  saveReading: async (
    locationId: string,
    metrics: {
      deviceCount: number;
      bluetoothDensity: number;
      timestamp: Date;
      riskScore?: number;
    }
  ) => {
    return prisma.environmentReading.create({
      data: {
        locationId,
        deviceCount: metrics.deviceCount,
        bluetoothDensity: metrics.bluetoothDensity,
        timestamp: metrics.timestamp,
        riskScore: metrics.riskScore ?? null,
      },
    });
  },

  getHeatmap: async (locationId?: string) => {
    return prisma.environmentReading.findMany({
      where: locationId ? { locationId } : {},
      orderBy: { timestamp: "desc" },
    });
  },
};
