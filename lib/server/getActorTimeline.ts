// lib/server/getActorTimeline.ts
import { prisma } from "@/lib/prisma";


export async function getActorTimeline(actorId: string) {
  const dbLogs = await prisma.audit.findMany({
    where: {
      OR: [
        { details: { path: ["wallet"], equals: actorId } },
        { details: { path: ["actor"], equals: actorId } },
        { details: { path: ["email"], equals: actorId } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  // You can also filter chain events by actor in getAuditTimeline
  // and pass them into this function or a separate chain loader.

  return dbLogs;
}
