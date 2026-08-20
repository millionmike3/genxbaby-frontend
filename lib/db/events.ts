import { prisma } from "@/lib/prisma";


export type LeadEvent = {
  id: string;
  leadId: string;
  eventType: string;
  page?: string | null;
  element?: string | null;
  description?: string | null;
  timestamp: Date;
  responseTimeMs?: number | null;
  lateNight?: boolean;
  metadata?: any;
};

/**
 * Save a full analytics event (Option A)
 * Stores all behavioral metadata for dashboards, heatmaps, replay, scoring, etc.
 */
export async function saveLeadEvent(event: LeadEvent) {
  return prisma.leadEvent.create({
    data: {
      id: event.id,
      leadId: event.leadId,
      eventType: event.eventType,
      page: event.page,
      element: event.element,
      description: event.description,
      timestamp: event.timestamp,
      responseTimeMs: event.responseTimeMs,
      lateNight: event.lateNight,
      metadata: event.metadata,
    },
  });
}

/**
 * Retrieve all events for a lead (used by GET /api/events)
 * Sorted newest → oldest
 */
export async function getLeadEvents(leadId: string) {
  return prisma.leadEvent.findMany({
    where: { leadId },
    orderBy: { timestamp: "desc" },
  });
}
