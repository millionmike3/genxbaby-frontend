// lib/db/leads.ts
import { prisma } from "../prisma";

export async function getLeadById(id: string) {
  return prisma.lead.findUnique({ where: { id } });
}

export async function updateLead(id: string, data: any) {
  return prisma.lead.update({ where: { id }, data });
}

export async function updateLeadScores(id: string, scores: any) {
  return prisma.lead.update({
    where: { id },
    data: { scores },
  });
}

export async function createLead(data: any) {
  return prisma.lead.create({ data });
}

export async function getFilteredLeads(filters: any) {
  return prisma.lead.findMany({ where: filters });
}
