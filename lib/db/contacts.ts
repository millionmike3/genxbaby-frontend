// lib/db/contacts.ts

import { getPrisma } from "./prisma";

interface LogContactAttemptInput {
  leadId: string;
  notes?: string;
}

export async function logContactAttempt({ leadId, notes }: LogContactAttemptInput) {
  const prisma = await getPrisma();

  return prisma.contactAttempt.create({
    data: {
      leadId,
      notes: notes ?? null,
      // timestamp is auto-set by Prisma
    },
  });
}
