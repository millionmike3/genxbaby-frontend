import jsPDF from "jspdf";

type FullDashboardReportProps = {
  timeline: any[];
  heatmap: {
    buckets: Record<string, number>;
    max: number;
  };
  fraudHeatmap: {
    buckets: Record<string, number>;
    max: number;
  };
  fraudScores: any[];
  adminScores: any[];
  anomalyScores: any[];
  actorRiskScores: any[];
};
export function exportFullDashboardReport({
  timeline,
  heatmap,
  fraudHeatmap,
  fraudScores,
  adminScores,
  anomalyScores,
  actorRiskScores,
}: FullDashboardReportProps) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "letter",
  });

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(14);
  doc.text("Full Audit Dashboard Report", 40, 40);

  let y = 70;
  doc.setFontSize(12);
  doc.text("Timeline Events", 40, y);
  y += 20;

  timeline.slice(0, 50).forEach((item) => {
    doc.text(
      `${item.action} — ${item.createdAt ? new Date(item.createdAt).toLocaleString() : "—"}`,
      40,
      y
    );
    y += 16;

    if (y > 700) {
      doc.addPage();
      y = 40;
    }
  });
  doc.addPage();
  y = 40;

  doc.text("Activity Heatmap Summary", 40, y);
  y += 20;

  doc.text(`Max Activity: ${heatmap.max}`, 40, y);
  y += 20;

  doc.text("Fraud Heatmap Summary", 40, y);
  y += 20;

  doc.text(`Max Fraud Activity: ${fraudHeatmap.max}`, 40, y);
  y += 20;

  doc.addPage();
  y = 40;

  doc.text("Fraud Scores", 40, y);
  y += 20;

  fraudScores.slice(0, 20).forEach((f) => {
    doc.text(`Score ${f.score} — ${f.action}`, 40, y);
    y += 16;
  });

  doc.addPage();
  y = 40;

  doc.text("Admin Scores", 40, y);
  y += 20;

  adminScores.forEach((s) => {
    doc.text(`${s.actor}: ${s.score}`, 40, y);
    y += 16;
  });
  doc.addPage();
  y = 40;

  doc.text("AI Anomaly Scores", 40, y);
  y += 20;

  anomalyScores.slice(0, 20).forEach((a) => {
    doc.text(`${a.type} — Score ${a.score}`, 40, y);
    y += 16;
  });

  doc.addPage();
  y = 40;

  doc.text("Actor Risk Scores", 40, y);
  y += 20;

  actorRiskScores.forEach((a) => {
    doc.text(`${a.actor}: ${a.score} (${a.events} events)`, 40, y);
    y += 16;
  });

  doc.save("full_dashboard_report.pdf");
}
