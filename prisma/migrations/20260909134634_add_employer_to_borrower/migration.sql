-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "employer" TEXT;

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "fraudSignals" TEXT[];

-- AlterTable
ALTER TABLE "Investor" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "TimelineEvent" ADD COLUMN     "message" TEXT;

-- AlterTable
ALTER TABLE "UnderwritingCase" ADD COLUMN     "cltv" DOUBLE PRECISION,
ADD COLUMN     "dti" DOUBLE PRECISION,
ADD COLUMN     "finalRate" DOUBLE PRECISION,
ADD COLUMN     "fraudScore" DOUBLE PRECISION,
ADD COLUMN     "investorDecision" TEXT,
ADD COLUMN     "llpa" DOUBLE PRECISION,
ADD COLUMN     "ltv" DOUBLE PRECISION,
ADD COLUMN     "reasons" TEXT[],
ADD COLUMN     "reservesMonths" DOUBLE PRECISION,
ALTER COLUMN "status" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Disclosure" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT,
    "title" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Disclosure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timeline" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "type" TEXT,
    "message" TEXT,
    "event" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudEvent" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "severity" TEXT,
    "payload" JSONB,
    "userId" TEXT,
    "anchorTxHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FraudEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingEvent" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnderwritingEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoringResult" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "fraudScore" DOUBLE PRECISION,
    "riskScore" DOUBLE PRECISION,
    "impulsivenessScore" DOUBLE PRECISION,
    "rawData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScoringResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investor" ADD CONSTRAINT "Investor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disclosure" ADD CONSTRAINT "Disclosure_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timeline" ADD CONSTRAINT "Timeline_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudEvent" ADD CONSTRAINT "FraudEvent_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingEvent" ADD CONSTRAINT "UnderwritingEvent_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoringResult" ADD CONSTRAINT "ScoringResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
