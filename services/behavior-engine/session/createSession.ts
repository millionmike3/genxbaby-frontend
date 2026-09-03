import prisma from "@/lib/prisma";
import { Metrics } from "../types/Metrics";

export async function createBehaviorSession(
  userId: string | null,
  leadId: string | null,
  investorId: string | null,
  pillar: string,
  page: string,
  startedAt: string,
  endedAt: string,
  metrics: Metrics,
  impulsivenessScore: number
) {
  return prisma.behaviorEvent.create({
    data: {
      userId: userId ? Number(userId) : undefined,
      leadId: leadId || undefined,
      investorId: investorId || undefined,
      pillar: pillar as any, // Pillar enum
      page,
      startedAt: new Date(startedAt),
      endedAt: new Date(endedAt),
      impulsivenessScore,
    },
  });
}
