// lib/logAudit.ts
import { prisma } from "@/lib/prisma";



export async function logAudit(action: string, details: any, adminId?: number) {
  try {
    await prisma.audit.create({
      data: {
        action,
        details,
        adminId: adminId ?? null,
      },
    });
  } catch (err) {
    console.error("Audit logging failed:", err);
    throw err;
  }
}
