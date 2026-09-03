import prisma from "@/lib/prisma";
import { classify } from "../classify/classify";

export async function updateBehaviorProfile(
  userId: string | null,
  leadId: string | null,
  investorId: string | null,
  pillar: string,
  impulsivenessScore: number
) {
  const where =
    userId
      ? { userId: Number(userId), pillar: pillar as any }
      : leadId
      ? { leadId, pillar: pillar as any }
      : { investorId, pillar: pillar as any };

  const existing = await prisma.behaviorProfile.findFirst({ where });

  if (!existing) {
    return prisma.behaviorProfile.create({
      data: {
        userId: userId ? Number(userId) : undefined,
        leadId: leadId || undefined,
        investorId: investorId || undefined,
        pillar: pillar as any, // FIXED
        score: impulsivenessScore,
      },
    });
  }

  return prisma.behaviorProfile.update({
    where: { id: existing.id },
    data: {
      score: impulsivenessScore,
    },
  });
}
