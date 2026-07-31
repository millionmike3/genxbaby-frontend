import { prisma } from "./prisma";

export async function logAudit({
  adminId,
  action,
  details,
  ip,
}: {
  adminId: string;
  action: string;
  details?: any;
  ip?: string | null;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        adminId,
        action,
        details: details ? JSON.stringify(details) : null,
        ip: ip || null,
      },
    });
  } catch (err) {
    console.error("Audit log error:", err);
  }
}
