-- CreateTable
CREATE TABLE "InvestorOverlay" (
    "id" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "maxDTI" DOUBLE PRECISION,
    "maxLTV" DOUBLE PRECISION,
    "maxCLTV" DOUBLE PRECISION,
    "minReserves" DOUBLE PRECISION,
    "minRiskScore" DOUBLE PRECISION,
    "maxFraudScore" DOUBLE PRECISION,
    "allowedProducts" TEXT,
    "llpaJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorOverlay_pkey" PRIMARY KEY ("id")
);
