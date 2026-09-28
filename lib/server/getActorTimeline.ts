// lib/server/getActorTimeline.ts
import { getPrisma } from "@/lib/db/prisma";

export async function getActorTimeline(actorId: string) {
  const prisma = await getPrisma();

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

  return dbLogs;
}
