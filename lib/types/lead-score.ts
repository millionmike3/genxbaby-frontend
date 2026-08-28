export interface LeadScore {
  // Required identifiers
  leadId: string;

  // Hardship scoring (0–100)
  hardshipScore: number;
  hardshipBand: "critical" | "high" | "medium" | "low";

  // Investor potential scoring (0–100)
  investorPotentialScore: number;
  investorPotentialBand: "high" | "medium" | "low";

  // Behavioral impulsivity scoring (0–100)
  impulsivityScore: number;
  impulsivityBand: "high" | "medium" | "low";

  // Timestamp when the score was calculated
  calculatedAt: Date;
}
import { Lead } from "@/lib/types/lead";
