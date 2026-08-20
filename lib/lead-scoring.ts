// lib/lead-scoring.ts
import { LeadEvent } from "@prisma/client";

export function calculateLeadScore(events: any[]){
  let score = 0;

  for (const e of events) {
    if (e.type === "CALL_ANSWERED") score += 10;
    if (e.type === "EMAIL_OPENED") score += 5;
    if (e.type === "MEETING_SCHEDULED") score += 20;
  }

  return score;
}
