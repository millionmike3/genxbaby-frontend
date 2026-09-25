// underwriting.types.ts

export type UnderwritingDecision =
  | "approved"
  | "declined"
  | "manual"
  | "review"
  | "incomplete";

export interface UnderwritingFlags {
  riskHigh?: boolean;
  fraudSuspected?: boolean;
  incomeMismatch?: boolean;
  bankMismatch?: boolean;
  creditInsufficient?: boolean;
  documentationMissing?: boolean;
  pricingOutOfRange?: boolean;
  investorRestrictions?: boolean;
  complianceHold?: boolean;
}

export interface UnderwritingTimelineEvent {
  id: string;
  applicationId: string;
  label: string;
  timestamp: Date;
}

export interface UnderwritingInputs {
  application: any; // DAL.Application.Full.getFull(id)
  lead: any;        // DAL.Lead.Basic.getById(id)
  pricing: any;     // PricingDAL.getByApplication(id)
  fraud: any;       // DAL.User.Fraud.getFraudProfile(id)
  scores: any;      // DAL.User.Scores.getRiskScore(id)
  investorAnalytics: any; // computeInvestorAnalytics()
}

export interface UnderwritingResult {
  id?: string;
  applicationId: string;

  decision: UnderwritingDecision;
  score: number; // underwriting score 0–100
  flags: UnderwritingFlags;

  summary: string; // human-readable summary for UI
  notes?: string;  // underwriter notes

  createdAt?: Date;
}

export interface UnderwritingSummary {
  decision: UnderwritingDecision;
  score: number;
  flags: UnderwritingFlags;
  summary: string;
}

export interface FullUnderwritingPackage {
  underwriting: any; // prisma.underwriting
  timeline: UnderwritingTimelineEvent[];
  latestResult: UnderwritingResult | null;
  pricing: any;
  fraud: any;
  scores: any;
}
