import { prisma } from "@/lib/prisma";

export const ApplicationDAL = {
  getById(id: string) {
    return prisma.application.findUnique({ where: { id } });
  },
  list() {
    return prisma.application.findMany();
  }
};
