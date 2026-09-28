import { getPrisma } from "@/lib/db/prisma";

export const ApplicationDAL = {
  async getById(id: string) {
    const prisma = await getPrisma();
    return prisma.application.findUnique({ where: { id } });
  },

  async list() {
    const prisma = await getPrisma();
    return prisma.application.findMany();
  }
};
