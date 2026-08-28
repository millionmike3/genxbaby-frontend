export interface LeadEvent {
  id: string;
  leadId: string;

  // Core event classification
  eventType: string;

  // Optional UI/behavior metadata
  page?: string | null;
  element?: string | null;
  description?: string | null;

  // Timestamp
  timestamp: Date;

  // Behavioral analytics
  responseTimeMs?: number | null;
  lateNight?: boolean;

  // Flexible metadata payload
  metadata?: any;
}
import { Lead } from "@/lib/types/lead";
