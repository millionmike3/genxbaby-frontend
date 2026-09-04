import { prisma } from "@/lib/prisma";
import { LoanPricingInput } from "./types";

export async function getLlpaAdjustmentDb(input: LoanPricingInput, notes: string[]) {
  const ficoBucket = bucketFico(input.fico);
  const ltvBucket = bucketLtv(input.ltv);

  const row = await prisma.llpaGridRow.findFirst({
    where: {
      agency: input.agency ?? "FNMA",
      productType: input.productType ?? "FIXED",
      occupancy: input.occupancy,
      propertyType: input.propertyType,
      purpose: input.purpose,
      ficoBucket,
      ltvBucket,
    },
  });

  if (!row) {
    notes.push(`LLPA: no match for ${ficoBucket}/${ltvBucket}`);
    return 0;
  }

  notes.push(`LLPA: ${row.adjustment.toFixed(3)} for ${ficoBucket}/${ltvBucket}`);
  return row.adjustment;
}

function bucketFico(fico: number): number {
  if (fico >= 760) return 760;
  if (fico >= 740) return 740;
  if (fico >= 720) return 720;
  if (fico >= 700) return 700;
  if (fico >= 680) return 680;
  if (fico >= 660) return 660;
  if (fico >= 640) return 640;
  return 620;
}

function bucketLtv(ltv: number): number {
  if (ltv <= 60) return 60;
  if (ltv <= 70) return 70;
  if (ltv <= 75) return 75;
  if (ltv <= 80) return 80;
  if (ltv <= 85) return 85;
  if (ltv <= 90) return 90;
  return 95;
}
