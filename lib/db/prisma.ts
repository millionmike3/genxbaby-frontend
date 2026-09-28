// lib/db/prisma.ts

import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | null = null;

export async function getPrisma() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}
