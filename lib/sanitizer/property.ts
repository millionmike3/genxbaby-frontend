export async function runPropertySanitizer(propertyId: number) {
  // TODO: integrate MLS, public record, valuation APIs

  return {
    riskScore: Math.floor(Math.random() * 40) + 60, // placeholder
    valuationConsistency: "HIGH",
    occupancyConsistency: "MEDIUM",
    publicRecordMatch: "MATCH",
    mlsMatch: "MATCH",
    fraudSignals: [
      "No occupancy mismatch detected",
      "Valuation within expected range",
      "Public record matches borrower declaration",
    ],
  };
}
