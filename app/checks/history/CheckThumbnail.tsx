"use client";

interface CheckThumbnailProps {
  check: {
    id: string;
    checkNumber: string;
    amount: number;
    memo?: string | null;
    payee: string | null;
    date: string | Date | null;
    status: string;
    createdAt: string | Date;

    signer?: {
      id: string;
      name: string;
      title?: string | null;
      signatureImage?: string | null;
    } | null;

    bankProfile: {
      id: number;
      createdAt: Date;
      bankName: string;
      routingNumber: string;
      accountNumber: string;
      nextCheckNumber: number;
      accountType: string | null;
      signerName: string | null;
      signatureImage: string | null;
      signatureUrl: string | null;
    } | null;

       fraudFlags: {
       id: string;
       createdAt: Date;
       reason: string;
       severity: "critical" | "warning" | "info";
       checkId: string;
       resolved: boolean;
       }[];

  };
}

export default function CheckThumbnail({ check }: CheckThumbnailProps) {
  return (
    <div className="border rounded bg-white shadow-sm p-3 w-48 text-xs">
      <p className="font-bold text-sm">
        {check.bankProfile?.bankName ?? "N/A"}
      </p>

      <p>#{check.checkNumber}</p>

      <p>{check.payee ?? "N/A"}</p>

      <p>${check.amount.toFixed(2)}</p>
    </div>
  );
}
