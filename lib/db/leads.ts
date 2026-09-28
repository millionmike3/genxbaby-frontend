// lib/db/leads.ts
import { getPrisma } from "../db/prisma";

export async function getLeadById(id: string) {
  const prisma = await getPrisma();
  return prisma.lead.findUnique({ where: { id } });
}

export async function updateLead(id: string, data: any) {
  const prisma = await getPrisma();
  return prisma.lead.update({ where: { id }, data });
}

export async function updateLeadScores(id: string, scores: any) {
  const prisma = await getPrisma();
  return prisma.lead.update({
    where: { id },
    data: { scores },
  });
}

export async function createLead(data: any) {
  const prisma = await getPrisma();
  return prisma.lead.create({ data });
}

export async function getFilteredLeads(filters: any) {
  const prisma = await getPrisma();
  return prisma.lead.findMany({ where: filters });
}
