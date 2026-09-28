import { getPrisma } from "@/lib/db/prisma";
import * as pdfParse from "pdf-parse";

export async function analyzeDocumentFraud(documentId: string) {
  const prisma = await getPrisma();

  const doc = await prisma.document.findUnique({
    where: { id: documentId },
  });

  if (!doc) throw new Error("Document not found");

  const res = await fetch(doc.url);
  const buffer = Buffer.from(await res.arrayBuffer());

  // pdf-parse has no default export in the ESM build,
  // so we call the namespace as a function.
  const pdf = await (pdfParse as any)(buffer);

  let signals: string[] = [];

  // Basic fraud signals
  if (pdf.info?.Creator?.includes("Photoshop")) {
    signals.push("PDF edited in Photoshop");
  }

  if (pdf.info?.Producer?.includes("Mac Preview")) {
    signals.push("PDF modified using Preview.app");
  }

  if (pdf.text.includes("template")) {
    signals.push("Document contains template markers");
  }

  if (pdf.text.includes("sample")) {
    signals.push("Document contains sample text");
  }

  if (pdf.numpages < 1) {
    signals.push("Document has no pages");
  }

  // Add more rules here...

  const fraudScore = signals.length * 20;

  await prisma.document.update({
    where: { id: documentId },
    data: { fraudSignals: signals, fraudScore },
  });

  return { fraudScore, signals };
}
