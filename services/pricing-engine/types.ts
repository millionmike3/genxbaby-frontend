export type LoanPricingInput = {
  fico: number;
  ltv: number;
  cltv?: number;
  occupancy: "owner" | "second" | "investment";
  propertyType: "SFR" | "CONDO" | "TWO_TO_FOUR" | "OTHER";
  purpose: "purchase" | "refi" | "cashout";
  loanType: "conv" | "fha" | "va" | "nonqm";
  termMonths: number;
  state?: string;
  firstTimeHomebuyer?: boolean;

  impulsivenessScore?: number;
  bluetoothPresent?: boolean;
  bluetoothRiskScore?: number;
  investorTier?: "A" | "B" | "C" | "D";
};
