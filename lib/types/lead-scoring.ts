import { Lead } from "@/lib/types/lead";
import { LeadEvent } from "@/lib/types/lead-event";
import { LeadScore } from "@/lib/types/lead-score";

/**
 * Hardship scoring based on simple financial + borrower context.
 */
export function calculateHardshipScore(lead: Lead): { score: number; band: Lead["hardshipBand"] } {
  let score = 0;

  // Higher loan balance + lower equity → higher hardship
  if (lead.loanBalance && lead.equityEstimate) {
    const equityRatio = lead.equityEstimate / lead.loanBalance;

    if (equityRatio < 0.2) score += 40;
    else if (equityRatio < 0.5) score += 25;
    else if (equityRatio < 0.8) score += 10;
  }

  // Borrower type weighting
  if (lead.borrowerType === "owner") score += 10;
  if (lead.borrowerType === "nonprofit") score += 5;

  if (score > 100) score = 100;

  const band: Lead["hardshipBand"] =
    score >= 76 ? "critical" :
    score >= 51 ? "high" :
    score >= 26 ? "medium" :
    "low";

  return { score, band };
}

/**
 * Investor potential scoring based on equity + borrower type.
 */
export function calculateInvestorPotential(lead: Lead): {
  score: number;
  band: Lead["investorPotentialBand"];
} {
  let score = 0;

  if (lead.equityEstimate) {
    if (lead.equityEstimate > 500_000) score += 40;
    else if (lead.equityEstimate > 250_000) score += 25;
    else if (lead.equityEstimate > 100_000) score += 15;
  }

  if (lead.borrowerType === "investor") score += 30;
  if (lead.borrowerType === "nonprofit") score += 10;

  if (score > 100) score = 100;

  const band: Lead["investorPotentialBand"] =
    score >= 70 ? "high" :
    score >= 40 ? "medium" :
    "low";

  return { score, band };
}

/**
 * Impulsivity scoring based on behavior events.
 */
export function calculateImpulsivity(events: LeadEvent[]): {
  score: number;
  band: Lead["impulsivityBand"];
} {
  let score = 0;

  for (const event of events) {
    // Fast responses
    if (event.responseTimeMs != null) { // excludes undefined and null
      if (event.responseTimeMs < 10 * 60 * 1000) {
        score += 3; // < 10 min
      } else if (event.responseTimeMs < 60 * 60 * 1000) {
        score += 2; // < 1 hour
      } else if (event.responseTimeMs < 24 * 60 * 60 * 1000) {
        score += 1; // same day
      }
    }

    // Late‑night activity
    if (event.lateNight) {
      score += 2;
    }

    // High‑frequency interactions
    if (event.eventType === "email_open" || event.eventType === "email_click") {
      score += 1;
    }
    if (event.eventType === "page_view" || event.eventType === "button_click") {
      score += 0.5;
    }
  }

  if (score > 100) score = 100;

  const band: Lead["impulsivityBand"] =
    score >= 60 ? "high" :
    score >= 30 ? "medium" :
    "low";

  return { score, band };
}

/**
 * Combined lead score object, ready to persist or show in the dashboard.
 */
export function calculateLeadScore(lead: Lead, events: LeadEvent[]): LeadScore {
  const hardship = calculateHardshipScore(lead);
  const investor = calculateInvestorPotential(lead);
  const impulsivity = calculateImpulsivity(events);

  return {
    leadId: lead.id,
    hardshipScore: hardship.score,
    hardshipBand: hardship.band,
    investorPotentialScore: investor.score,
    investorPotentialBand: investor.band,
    impulsivityScore: impulsivity.score,
    impulsivityBand: impulsivity.band,
    calculatedAt: new Date(),
  };
}
