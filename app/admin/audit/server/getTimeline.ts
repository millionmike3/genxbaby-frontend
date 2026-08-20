"use server";

import { prisma } from "@/lib/prisma";

export async function getTimeline() {
  const events = await prisma.audit.findMany({
    orderBy: { createdAt: "desc" },
    take: 1000,
    include: {
      admin: true,
    },
  });

  return events.map((e) => ({
    id: e.id,
    action: e.action,
    createdAt: e.createdAt.toISOString(),
    details: e.details,
    adminId: e.adminId,
    admin: e.admin ? { id: e.admin.id, email: e.admin.email } : null,
  }));
}
