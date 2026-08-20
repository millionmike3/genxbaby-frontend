// lib/db/contacts.ts
import { prisma } from "../prisma";

export async function logContactAttempt({
  leadId,
  channel,
  outcome,
}: {
  leadId: string;
  channel: string;
  outcome: string;
}) {
  return prisma.contactAttempt.create({
    data: { leadId, channel, outcome },
  });
}
