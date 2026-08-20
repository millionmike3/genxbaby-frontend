export interface Lead {
  id: string;

  // Basic identity
  name: string;
  email: string;
  phone?: string;

  // Property / financial context
  propertyAddress?: string;
  loanBalance?: number;
  equityEstimate?: number;
  borrowerType?: "owner" | "investor" | "nonprofit" | "unknown";

  // Hardship scoring
  hardshipScore: number;
  hardshipBand: "low" | "medium" | "high" | "critical";

  // Investor potential
  investorPotentialScore: number;
  investorPotentialBand: "low" | "medium" | "high";
  investorNotes?: string;

  // Behavior / impulsiveness
  impulsivityScore: number;
  impulsivityBand: "low" | "medium" | "high";

  // CRM workflow
  status: "new" | "contacted" | "in_conversation" | "converted" | "dead";
  preferredContactChannel?: "phone" | "sms" | "email";

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastContactAt?: Date;
  nextFollowUpAt?: Date;
}
