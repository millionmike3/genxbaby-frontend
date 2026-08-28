// lib/db/contacts.ts

import { prisma } from "./prisma";

interface LogContactAttemptInput {
  leadId: string;
  notes?: string;
}

export async function logContactAttempt({ leadId, notes }: LogContactAttemptInput) {
  return prisma.contactAttempt.create({
    data: {
      leadId,
      notes: notes ?? null,
      // timestamp is auto-set by Prisma
    },
  });
}
