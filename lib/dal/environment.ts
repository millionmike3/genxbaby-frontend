export const EnvironmentDAL = {
  async saveReading(
    locationId: string,
    metrics: {
      deviceCount: number;
      bluetoothDensity: number;
      timestamp: Date;
      riskScore?: number;
    }
  ) {
    const { prisma } = await import("@/lib/prisma");

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

  async getHeatmap(locationId?: string) {
    const { prisma } = await import("@/lib/prisma");

    return prisma.environmentReading.findMany({
      where: locationId ? { locationId } : {},
      orderBy: { timestamp: "desc" },
    });
  },
};
