import { getPrisma } from "@/lib/db/prisma";

export async function logPricingEvent({
  actorRole,
  actorId,
  action,
  module,
  details,
}: {
  actorRole: string;
  actorId?: string;
  action: string;
  module: string;
  details: string;
}) {
  const prisma = await getPrisma();

  await prisma.pricingAuditLog.create({
    data: {
      actorRole,
      actorId,
      action,
      module,
      details,
    },
  });
}
