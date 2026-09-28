"use server";

import { getPrisma } from "@/lib/db/prisma";

export async function getAuditLogs() {
  const prisma = await getPrisma();

  return prisma.audit.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}
