// app/admin/audit/exportPDF.ts
"use client";

import jsPDF from "jspdf";

/**
 * Export the filtered audit timeline to a PDF file.
 *
 * This function runs client-side only.
 * It supports up to ~100 rows per PDF for readability.
 */
export function exportPDF(filtered: any[]) {
  try {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(14);
    doc.text("Unified Audit Timeline", 10, 10);

    doc.setFontSize(10);

    let y = 20;

    filtered.slice(0, 100).forEach((item) => {
      const created =
        item.createdAt instanceof Date
          ? item.createdAt.toLocaleString()
          : new Date(item.createdAt).toLocaleString();

      const line = `${item.source} | ${item.action} | ${created}`;

      doc.text(line, 10, y);

      y += 5;

      // Add new page if needed
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("audit_timeline.pdf");
  } catch (err) {
    console.error("PDF export failed:", err);
  }
}
