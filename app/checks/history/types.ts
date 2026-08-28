export interface CheckHistoryItem {
  id: string;
  createdAt: Date | string;

  checkNumber: string;
  payee: string | null;
  date: Date | string | null;
  memo: string | null;

  amount: number;
  amountWritten?: string | null;   // ✅ ADD THIS
  status: string;

  bankProfile: {
    id: number;
    createdAt: Date | string;
    bankName: string;
    routingNumber: string;
    accountNumber: string;
    nextCheckNumber: number;
    accountType: string | null;
    signerName: string | null;
    signatureImage: string | null;
    signatureUrl: string | null;
  } | null;

signer?: {
  id: string;
  name: string;
  title?: string | null;
  signatureImage?: string | null;
  signatureUrl?: string | null;   // ✅ ADD THIS
} | null;


  fraudFlags: {
    id: string;
    createdAt: Date | string;
    reason: string;
    message: string;
    severity: string;
    checkId: string;
    resolved: boolean;
  }[];
}
