-- CreateTable
CREATE TABLE "LlpaGrid" (
    "id" SERIAL NOT NULL,
    "investor" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "occupancy" TEXT NOT NULL,
    "ficoMin" INTEGER NOT NULL,
    "ficoMax" INTEGER NOT NULL,
    "ltvMin" DOUBLE PRECISION NOT NULL,
    "ltvMax" DOUBLE PRECISION NOT NULL,
    "termMonths" INTEGER NOT NULL,
    "llpaBps" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LlpaGrid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingAssetSnapshot" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "mortgageAssetId" INTEGER,
    "assetQualityScore" INTEGER NOT NULL,
    "cashflowScore" INTEGER NOT NULL,
    "riskScore" INTEGER NOT NULL,
    "diversificationImpact" INTEGER NOT NULL,
    "valuationJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnderwritingAssetSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiskSnapshot" (
    "id" SERIAL NOT NULL,
    "loanId" INTEGER NOT NULL,
    "ltv" DOUBLE PRECISION NOT NULL,
    "dscr" DOUBLE PRECISION NOT NULL,
    "riskScore" INTEGER NOT NULL,
    "delinquencyJson" JSONB NOT NULL,
    "marketJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RiskSnapshot_pkey" PRIMARY KEY ("id")
);
