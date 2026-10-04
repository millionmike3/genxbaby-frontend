import { Application } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type ChecklistItem = {
  type: string;
  label: string;
  reason?: string;
};

/**
 * Static rules based on application attributes.
 * This is used for borrower-facing checklist generation.
 */
export function buildChecklist(app: Application): ChecklistItem[] {
  const items: ChecklistItem[] = [];

  // Income docs
  if (app.employmentType === "W2") {
    items.push({
      type: "INCOME_W2",
      label: "Most recent 2 years W-2s",
      reason: "W-2 income verification",
    });
    items.push({
      type: "INCOME_PAYSTUBS",
      label: "Most recent 30 days paystubs",
      reason: "Current income verification",
    });
  }

  if (app.employmentType === "SELF_EMPLOYED") {
    items.push({
      type: "INCOME_TAX_RETURNS",
      label: "Most recent 2 years personal tax returns",
      reason: "Self-employed income analysis",
    });
    items.push({
      type: "INCOME_BUSINESS_RETURNS",
      label: "Most recent 2 years business tax returns",
      reason: "Business income stability",
    });
  }

  // Assets
  items.push({
    type: "ASSETS_BANK",
    label: "Most recent 2 months bank statements",
    reason: "Assets and reserves verification",
  });

  // Property
  if (app.occupancy === "INVESTMENT") {
    items.push({
      type: "PROPERTY_LEASE",
      label: "Current lease agreement(s)",
      reason: "Rental income verification",
    });
  }

  // Credit
  items.push({
    type: "CREDIT_EXPLANATION",
    label: "Letter of explanation for derogatory credit (if applicable)",
  });

  return items;
}

/**
 * Dynamic checklist generator:
 * - Pulls application + underwriting case
 * - Generates required documents
 * - Inserts into DocumentRequirement table
 */
export async function generateChecklistForApplication(applicationId: string) {
  const app = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      borrower: true,
      underwritingCase: true,
    },
  });

  if (!app) return null;

  const items: Array<{
    type: string;
    label: string;
    required: boolean;
    reason?: string;
  }> = [];

  // Basic examples – expand with your real rules
  items.push({
    type: "INCOME",
    label: "Most recent pay stubs",
    required: true,
    reason: "Verify current income",
  });

  items.push({
    type: "ASSETS",
    label: "Last 2 months bank statements",
    required: true,
    reason: "Verify assets and reserves",
  });

  // Conditional approval conditions
  if (app.underwritingCase?.decision === "CONDITIONAL_APPROVE") {
    items.push({
      type: "CONDITION",
      label: "Letter of explanation for credit inquiry",
      required: true,
      reason: "Underwriting condition",
    });
  }

  // Insert into DB
  const created = await prisma.$transaction(
    items.map((item) =>
      prisma.documentRequirement.create({
        data: {
          applicationId,
          type: item.type,
          label: item.label,
          required: item.required,
          reason: item.reason,
        },
      })
    )
  );

  return created;
}
