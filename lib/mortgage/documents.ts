// lib/mortgage/documents.ts
import { prisma } from "@/lib/prisma";

export async function addDocument(
  mortgageId: number,
  name: string,
  url: string,
  type: string
) {
  return prisma.document.create({
    data: {
      mortgageId,
      name,
      url,
      type,
      status: "PENDING",
    },
  });
}

export async function markDocumentStatus(
  documentId: number,
  status: "PENDING" | "RECEIVED" | "REJECTED" | "VERIFIED"
) {
  return prisma.document.update({
    where: { id: documentId },
    data: { status },
  });
}

export async function classifyDocument(documentId: number, classification: string) {
  return prisma.document.update({
    where: { id: documentId },
    data: { classification },
  });
}
