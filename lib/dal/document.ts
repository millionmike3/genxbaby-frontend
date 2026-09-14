import { prisma } from "@/lib/prisma";

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
    return prisma.document.create({ data });
  },

  async getById(id: string) {
    return prisma.document.findUnique({ where: { id } });
  },

  async getByApplication(applicationId: string) {
    return prisma.document.findMany({
      where: { applicationId },
      orderBy: { uploadedAt: "desc" },
    });
  },

  async delete(id: string) {
    return prisma.document.delete({ where: { id } });
  },
};
