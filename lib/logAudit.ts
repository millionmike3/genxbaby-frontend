"use server";

export async function logAudit(
  action: string,
  details: any,
  adminId?: number
) {
  try {
    // Load Prisma at runtime (server-only)
    const { prisma } = await import("@/lib/prisma");

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
