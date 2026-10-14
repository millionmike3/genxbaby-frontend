"use server";

import { getPrisma } from "@/lib/db/prisma";

/**
 * runFraudScan
 * -------------
 * Executes a fraud scan on a document and stores the results.
 * This function is called after a borrower uploads a document.
 *
 * @param documentId - The ID of the document to scan
 */
export async function runFraudScan(documentId: number) {
  const prisma = await getPrisma();

  // Fetch the document
  const document = await prisma.document.findUnique({
    where: { id: documentId },
  });

  if (!document) {
    throw new Error(`Document ${documentId} not found`);
  }

  // Example fraud scoring logic
  // Replace this with your real fraud engine or external API call
  const fraudScore = await computeFraudScore(document);

  // Store fraud results
  await prisma.document.update({
    where: { id: documentId },
    data: {
      fraudScore,
      status: fraudScore > 70 ? "FLAGGED" : "VERIFIED",
    },
  });

  return fraudScore;
}

/**
 * computeFraudScore
 * -----------------
 * Placeholder fraud scoring logic.
 * Replace with your real fraud engine, ML model, or API call.
 */
async function computeFraudScore(document: { id: number; name: string; url: string }) {
  // Simple deterministic scoring for now
  // You can replace this with:
  // - AI model inference
  // - External fraud API
  // - Pattern matching
  // - Behavioral scoring
  const base = document.name.length % 100;

  // Example: documents with "id" or "ssn" in the name get flagged harder
  const riskBoost =
    /id|ssn|passport|license/i.test(document.name) ? 25 : 0;

  return Math.min(base + riskBoost, 100);
}
