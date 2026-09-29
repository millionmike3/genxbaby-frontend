// lib/db/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // allow global prisma to survive hot reloads in dev
  var prisma: PrismaClient | undefined;
}

export const getPrisma = () => {
  if (global.prisma) return global.prisma;

  global.prisma = new PrismaClient();
  return global.prisma;
};
