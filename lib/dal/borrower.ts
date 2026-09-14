import { prisma } from "@/lib/prisma";

export const BorrowerDAL = {
  getById(id: string) {
    return prisma.borrower.findUnique({ where: { id } });
  }
};
