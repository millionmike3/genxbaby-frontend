export interface LeadContactAttempt {
  id: string;
  leadId: string;
  timestamp: Date;
  notes?: string;

  channel?: "phone" | "sms" | "email" | "in_person" | "other";
  outcome?: "no_answer" | "left_voicemail" | "connected" | "follow_up_scheduled";
  durationSeconds?: number;

  createdAt?: Date;
  updatedAt?: Date;
}
