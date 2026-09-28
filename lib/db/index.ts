// lib/dal/index.ts
import { getPrisma } from "@/lib/db/prisma";

export const DAL = {
  async someMethod() {
    const prisma = await getPrisma();
    return prisma.someModel.findMany();
  },

  async anotherMethod() {
    const prisma = await getPrisma();
    return prisma.otherModel.findFirst();
  },
};
