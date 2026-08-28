"use client";

import Image from "next/image";
import { toWords } from "number-to-words";

interface BankProfile {
  bankName: string;
  routingNumber: string;
  accountNumber: string;
}

interface SignerProfile {
  signatureImage?: string | null;
}

interface CheckPreviewProps {
  bank: BankProfile;
  signer: SignerProfile;
  checkNumber: string | number;
  payee: string;
  amount: number;
  memo?: string | null;
  date: string;
}

export default function CheckPreview({
  bank,
  signer,
  checkNumber,
  payee,
  amount,
  memo,
  date,
}: CheckPreviewProps) {
  return (
    <div
      style={{
        position: "relative",
        width: 800,
        height: 350,
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        backgroundColor: "#DDEAF7",
      }}
    >
      {/* Background SVG */}
      <Image
        src="/check-background.svg"
        alt="Check Background"
        fill
        style={{ objectFit: "cover" }}
      />

      {/* BANK NAME */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        {bank.bankName}
      </div>

      {/* ROUTING + ACCOUNT */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 40,
          fontSize: 12,
        }}
      >
        Routing: {bank.routingNumber}
      </div>

      <div
        style={{
          position: "absolute",
          top: 80,
          left: 40,
          fontSize: 12,
        }}
      >
        Account: {bank.accountNumber}
      </div>

      {/* CHECK NUMBER */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        #{checkNumber}
      </div>

      {/* PAYEE */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 40,
          fontSize: 12,
        }}
      >
        Pay to the Order of:
      </div>

      <div
        style={{
          position: "absolute",
          top: 130,
          left: 200,
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        {payee}
      </div>

      {/* DATE */}
      <div
        style={{
          position: "absolute",
          top: 130,
          right: 140,
          fontSize: 12,
        }}
      >
        Date:
      </div>

      <div
        style={{
          position: "absolute",
          top: 130,
          right: 40,
          fontSize: 14,
        }}
      >
        {date}
      </div>

      {/* WRITTEN AMOUNT */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 40,
          fontSize: 12,
        }}
      >
        {convertAmountToWords(amount)} dollars
      </div>

      {/* NUMERIC AMOUNT */}
      <div
        style={{
          position: "absolute",
          top: 170,
          right: 40,
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        ${amount.toFixed(2)}
      </div>

      {/* MEMO */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 40,
          fontSize: 12,
        }}
      >
        Memo:
      </div>

      <div
        style={{
          position: "absolute",
          top: 240,
          left: 100,
          fontSize: 12,
        }}
      >
        {memo || ""}
      </div>

      {/* SIGNATURE */}
      {signer.signatureImage && (
        <Image
          src={signer.signatureImage}
          alt="Signature"
          width={150}
          height={50}
          style={{
            position: "absolute",
            bottom: 60,
            right: 40,
            objectFit: "contain",
          }}
        />
      )}

      {/* MICR LINE */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 40,
          fontSize: 20,
          fontWeight: 700,
          fontFamily: "monospace",
        }}
      >
        ⑆{bank.routingNumber}⑆ {bank.accountNumber}⑈ {checkNumber}
      </div>
    </div>
  );
}

function convertAmountToWords(amount: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [dollars, cents] = formatter.format(amount).replace("$", "").split(".");

  return `${toWords(parseInt(dollars))} and ${cents}/100`;
}
