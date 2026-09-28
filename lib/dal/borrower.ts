import { getPrisma } from "@/lib/db/prisma";

export const BorrowerDAL = {
  async getById(id: string) {
    const prisma = await getPrisma();
    return prisma.borrower.findUnique({ where: { id } });
  }
};
