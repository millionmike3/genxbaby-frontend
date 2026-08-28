import { CheckHistoryItem } from "../types";

export interface SarExportFlag {
  checkId: string;
  checkNumber: string;
  amount: number;
  payee: string | null;
  date: string | Date | null;
  flagId: string;
  severity: string;
  reason: string;
  message: string;
  resolved: boolean;
  createdAt: string | Date;   // ✅ FIXED
}


export function buildSarExport(checks: CheckHistoryItem[]): SarExportFlag[] {
  return checks.flatMap((check) =>
    check.fraudFlags.map((flag) => ({
      checkId: check.id,
      checkNumber: check.checkNumber,
      amount: check.amount,
      payee: check.payee,
      date: check.date,
      flagId: flag.id,
      severity: flag.severity,
      reason: flag.reason,
      message: flag.message,
      resolved: flag.resolved,
      createdAt: flag.createdAt,
    }))
  );
}

export function sarExportToCsv(rows: SarExportFlag[]): string {
  const headers = [
    "checkId",
    "checkNumber",
    "amount",
    "payee",
    "date",
    "flagId",
    "severity",
    "reason",
    "message",
    "resolved",
    "createdAt",
  ];

  const lines = rows.map((r) =>
    [
      r.checkId,
      r.checkNumber,
      r.amount.toFixed(2),
      r.payee ?? "",
      r.date ? new Date(r.date).toISOString() : "",
      r.flagId,
      r.severity,
      r.reason.replace(/"/g, '""'),
      r.message.replace(/"/g, '""'),
      r.resolved ? "true" : "false",
      (r.createdAt instanceof Date
  ? r.createdAt.toISOString()
  : new Date(r.createdAt).toISOString())

    ]
      .map((v) => `"${String(v)}"`)
      .join(",")
  );

  return [headers.join(","), ...lines].join("\n");
}
