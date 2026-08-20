"use server";

import { prisma } from "@/lib/prisma";


export async function getAuditLogs() {
  return prisma.audit.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}
