-- CreateTable
CREATE TABLE "LlpaGridRow" (
    "id" SERIAL NOT NULL,
    "agency" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "occupancy" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "ficoBucket" INTEGER NOT NULL,
    "ltvBucket" INTEGER NOT NULL,
    "adjustment" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LlpaGridRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOverlay" (
    "id" SERIAL NOT NULL,
    "productType" TEXT NOT NULL,
    "ltvMax" DOUBLE PRECISION NOT NULL,
    "ficoMin" INTEGER NOT NULL,
    "overlayRate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProductOverlay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NonQMPricingRule" (
    "id" SERIAL NOT NULL,
    "programName" TEXT NOT NULL,
    "dscrMin" DOUBLE PRECISION,
    "ficoMin" INTEGER,
    "ltvMax" DOUBLE PRECISION,
    "rateAdd" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "NonQMPricingRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorPricingSheet" (
    "id" SERIAL NOT NULL,
    "investorId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "effectiveAt" TIMESTAMP(3) NOT NULL,
    "baseSpread" DOUBLE PRECISION NOT NULL,
    "llpaFactor" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "InvestorPricingSheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerQuote" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "input" JSONB NOT NULL,
    "result" JSONB NOT NULL,

    CONSTRAINT "BorrowerQuote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorQuote" (
    "id" SERIAL NOT NULL,
    "investorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "input" JSONB NOT NULL,
    "result" JSONB NOT NULL,

    CONSTRAINT "InvestorQuote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" SERIAL NOT NULL,
    "borrowerId" INTEGER NOT NULL,
    "investorId" INTEGER,
    "principal" DOUBLE PRECISION NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "termMonths" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "loanId" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidDate" TIMESTAMP(3),
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
