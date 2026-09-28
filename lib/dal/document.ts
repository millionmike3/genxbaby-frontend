export const DocumentDAL = {
  async create(data: {
    applicationId?: string;
    borrowerId?: string;
    investorId?: string;
    name: string;
    type: string;
    url: string;
    metadata?: any;
  }) {
    const { prisma } = await import("@/lib/prisma");
    return prisma.document.create({ data });
  },

  async getById(id: string) {
    const { prisma } = await import("@/lib/prisma");
    return prisma.document.findUnique({ where: { id } });
  },

  async getByApplication(applicationId: string) {
    const { prisma } = await import("@/lib/prisma");
    return prisma.document.findMany({
      where: { applicationId },
      orderBy: { uploadedAt: "desc" },
    });
  },

  async delete(id: string) {
    const { prisma } = await import("@/lib/prisma");
    return prisma.document.delete({ where: { id } });
  },
};
