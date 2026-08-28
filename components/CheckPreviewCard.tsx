"use client";

import Image from "next/image";

interface BankProfile {
  bankName: string;
  routingNumber: string;
  accountNumber: string;
}

interface SignerProfile {
  signatureImage?: string | null;
}

interface CheckPreviewCardProps {
  bank: BankProfile | null;
  signer: SignerProfile | null;
  checkNumber: string | number;
  payee: string;
  amount: number;
  memo?: string | null;
  date: string;
}

export default function CheckPreviewCard({
  bank,
  signer,
  checkNumber,
  payee,
  amount,
  memo,
  date,
}: CheckPreviewCardProps) {
  // If bank is null, show placeholder
  if (!bank) {
    return (
      <div className="rounded-xl border border-neutral-300 bg-white p-6 text-neutral-500">
        Select a bank profile to preview the check
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="text-lg font-semibold">{bank.bankName}</div>
      <div className="text-sm text-neutral-500">Routing: {bank.routingNumber}</div>
      <div className="text-sm text-neutral-500">Account: {bank.accountNumber}</div>

      <div className="mt-4 font-bold">#{checkNumber}</div>

      <div className="mt-4">
        <span className="text-sm text-neutral-500">Pay to the Order of:</span>
        <div className="text-lg font-semibold">{payee}</div>
      </div>

      <div className="mt-4">
        <span className="text-sm text-neutral-500">Amount:</span>
        <div className="text-xl font-bold">${amount.toFixed(2)}</div>
      </div>

      <div className="mt-4">
        <span className="text-sm text-neutral-500">Memo:</span>
        <div className="text-sm">{memo || ""}</div>
      </div>

      {signer?.signatureImage && (
        <Image
          src={signer.signatureImage}
          alt="Signature"
          width={150}
          height={50}
          className="mt-4"
        />
      )}

      <div className="mt-6 font-mono font-bold text-lg">
        ⑆{bank.routingNumber}⑆ {bank.accountNumber}⑈ {checkNumber}
      </div>
    </div>
  );
}
