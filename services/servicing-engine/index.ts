export type ServicingLoanSnapshot = {
  loanId: string;
  currentBalance: number;
  interestRate: number;
  termMonths: number;
  startDate: Date;
  escrowBalance?: number;
  delinquencyStatus?: "current" | "30" | "60" | "90" | "foreclosure";
};

export function calculatePayment(snapshot: ServicingLoanSnapshot): number {
  const r = snapshot.interestRate / 100 / 12;
  const n = snapshot.termMonths;
  const P = snapshot.currentBalance;

  if (r === 0) return P / n;

  return (P * r) / (1 - Math.pow(1 + r, -n));
}
