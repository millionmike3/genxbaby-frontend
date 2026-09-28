import { getPrisma } from "@/lib/db/prisma";

export async function logAudit({
  actor,
  action,
  target,
  metadata = {},
}: {
  actor: string;
  action: string;
  target: string;
  metadata?: any;
}) {
  try {
    const prisma = await getPrisma();

    const entry = await prisma.auditLog.create({
      data: {
        actor,
        action,
        target,
        metadata,
      },
    });

    return entry;
  } catch (err) {
    console.error("AUDIT LOG ERROR:", err);
    throw err;
  }
}
