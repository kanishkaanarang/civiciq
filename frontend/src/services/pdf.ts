import jsPDF from "jspdf";
import type { AnalysisResult } from "../types/analysis";

export function downloadReport(result: AnalysisResult) {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("CivicIQ AI Incident Report", 20, 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  let y = 40;

  doc.text(`Category: ${result.category}`, 20, y);
  y += 10;

  doc.text(`Severity: ${result.severity}`, 20, y);
  y += 10;

  doc.text(`Department: ${result.department}`, 20, y);
  y += 10;

  doc.text(`Confidence: ${Math.round(result.confidence * 100)}%`, 20, y);
  y += 20;

  doc.setFont("helvetica", "bold");
  doc.text("Summary", 20, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  const summary = doc.splitTextToSize(result.summary, 170);
  doc.text(summary, 20, y);
  y += summary.length * 7 + 10;

  doc.setFont("helvetica", "bold");
  doc.text("Recommended Action", 20, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  const action = doc.splitTextToSize(result.recommended_action, 170);
  doc.text(action, 20, y);
  y += action.length * 7 + 10;

  doc.setFont("helvetica", "bold");
  doc.text("AI Reasoning", 20, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  const reasoning = doc.splitTextToSize(result.reasoning, 170);
  doc.text(reasoning, 20, y);

  doc.save("CivicIQ_Report.pdf");
}