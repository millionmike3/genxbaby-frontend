import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// -----------------------------
// 1. Create global Prisma client
// -----------------------------
if (!global.prisma) {
  global.prisma = new PrismaClient({
    log: ["query", "error", "warn"],
  });
}

prisma = global.prisma;

// -----------------------------
// 2. Export BOTH prisma and getPrisma()
// -----------------------------
export { prisma };

export function getPrisma(): PrismaClient {
  return prisma;
}
