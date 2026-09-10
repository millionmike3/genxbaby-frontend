/*
  Warnings:

  - The primary key for the `BankProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountNumber` on the `BankProfile` table. All the data in the column will be lost.
  - You are about to drop the column `accountType` on the `BankProfile` table. All the data in the column will be lost.
  - You are about to drop the column `bankName` on the `BankProfile` table. All the data in the column will be lost.
  - You are about to drop the column `nextCheckNumber` on the `BankProfile` table. All the data in the column will be lost.
  - You are about to drop the column `signatureImage` on the `BankProfile` table. All the data in the column will be lost.
  - You are about to drop the column `signatureUrl` on the `BankProfile` table. All the data in the column will be lost.
  - You are about to drop the column `signerName` on the `BankProfile` table. All the data in the column will be lost.
  - You are about to drop the column `endedAt` on the `BehaviorEvent` table. All the data in the column will be lost.
  - You are about to drop the column `impulsivenessScore` on the `BehaviorEvent` table. All the data in the column will be lost.
  - You are about to drop the column `pillar` on the `BehaviorEvent` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `BehaviorEvent` table. All the data in the column will be lost.
  - You are about to drop the column `ticker` on the `BehaviorEvent` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `BehaviorEvent` table. All the data in the column will be lost.
  - You are about to drop the column `pillar` on the `BehaviorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `BehaviorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `fingerprint` on the `BluetoothEvent` table. All the data in the column will be lost.
  - You are about to drop the column `manufacturer` on the `BluetoothEvent` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `BluetoothEvent` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `BluetoothEvent` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `BluetoothEvent` table. All the data in the column will be lost.
  - You are about to drop the column `signalStrength` on the `BluetoothEvent` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `BluetoothEvent` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `memo` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `payee` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `pdfUrl` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `voidReason` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `voidedAt` on the `Check` table. All the data in the column will be lost.
  - The `fraudSignals` column on the `Document` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `anchorTxHash` on the `FraudEvent` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `FraudEvent` table. All the data in the column will be lost.
  - You are about to drop the column `severity` on the `FraudEvent` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `FraudEvent` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `FraudEvent` table. All the data in the column will be lost.
  - You are about to drop the column `checkId` on the `FraudFlag` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `FraudFlag` table. All the data in the column will be lost.
  - You are about to drop the column `resolved` on the `FraudFlag` table. All the data in the column will be lost.
  - You are about to drop the column `severity` on the `FraudFlag` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `SarFlag` table. All the data in the column will be lost.
  - You are about to drop the column `signatureImage` on the `Signer` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Signer` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `SuspiciousActivityReport` table. All the data in the column will be lost.
  - You are about to drop the column `checkId` on the `SuspiciousActivityReport` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `SuspiciousActivityReport` table. All the data in the column will be lost.
  - You are about to drop the column `flagId` on the `SuspiciousActivityReport` table. All the data in the column will be lost.
  - You are about to drop the column `severity` on the `SuspiciousActivityReport` table. All the data in the column will be lost.
  - The `reasons` column on the `UnderwritingCase` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `applicationId` on the `UnderwritingEvent` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `UnderwritingEvent` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `UnderwritingEvent` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `UnderwritingEvent` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AnchorRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BluetoothAlert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BorrowerDoc` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BorrowerQuote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvestorOverlay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvestorPricingSheet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvestorQuote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LLPAAdjustment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LLPAGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LlpaGridRow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Loan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NonQMPricingRule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PipelineDeal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductOverlay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScoringResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StockEvent` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[applicationId]` on the table `Check` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationId]` on the table `FraudEvent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationId]` on the table `Timeline` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationId]` on the table `TimelineEvent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[underwritingCaseId]` on the table `UnderwritingEvent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `BehaviorEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BluetoothEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Disclosure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FraudEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FraudFlag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UnderwritingEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BluetoothEvent" DROP CONSTRAINT "BluetoothEvent_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "BorrowerDoc" DROP CONSTRAINT "BorrowerDoc_userId_fkey";

-- DropForeignKey
ALTER TABLE "Check" DROP CONSTRAINT "Check_bankProfileId_fkey";

-- DropForeignKey
ALTER TABLE "FraudEvent" DROP CONSTRAINT "FraudEvent_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "FraudFlag" DROP CONSTRAINT "FraudFlag_checkId_fkey";

-- DropForeignKey
ALTER TABLE "LLPAAdjustment" DROP CONSTRAINT "LLPAAdjustment_groupId_fkey";

-- DropForeignKey
ALTER TABLE "ScoringResult" DROP CONSTRAINT "ScoringResult_userId_fkey";

-- DropForeignKey
ALTER TABLE "Signer" DROP CONSTRAINT "Signer_bankProfileId_fkey";

-- DropForeignKey
ALTER TABLE "SuspiciousActivityReport" DROP CONSTRAINT "SuspiciousActivityReport_checkId_fkey";

-- DropForeignKey
ALTER TABLE "SuspiciousActivityReport" DROP CONSTRAINT "SuspiciousActivityReport_flagId_fkey";

-- DropForeignKey
ALTER TABLE "UnderwritingEvent" DROP CONSTRAINT "UnderwritingEvent_applicationId_fkey";

-- DropIndex
DROP INDEX "Check_checkNumber_key";

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "debtsMonthly" INTEGER,
ADD COLUMN     "incomeMonthly" INTEGER,
ADD COLUMN     "liquidAssets" INTEGER,
ADD COLUMN     "loanAmount" INTEGER,
ADD COLUMN     "noteRate" DOUBLE PRECISION,
ADD COLUMN     "pitiMonthly" INTEGER,
ADD COLUMN     "propertyValue" INTEGER,
ADD COLUMN     "totalLiens" INTEGER,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BankProfile" DROP CONSTRAINT "BankProfile_pkey",
DROP COLUMN "accountNumber",
DROP COLUMN "accountType",
DROP COLUMN "bankName",
DROP COLUMN "nextCheckNumber",
DROP COLUMN "signatureImage",
DROP COLUMN "signatureUrl",
DROP COLUMN "signerName",
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "riskScore" DOUBLE PRECISION,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "routingNumber" DROP NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BankProfile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BankProfile_id_seq";

-- AlterTable
ALTER TABLE "BehaviorEvent" DROP COLUMN "endedAt",
DROP COLUMN "impulsivenessScore",
DROP COLUMN "pillar",
DROP COLUMN "startedAt",
DROP COLUMN "ticker",
DROP COLUMN "timestamp",
ADD COLUMN     "behaviorProfileId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "element" TEXT,
ADD COLUMN     "eventType" TEXT,
ADD COLUMN     "lateNight" BOOLEAN,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "responseTimeMs" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "page" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BehaviorProfile" DROP COLUMN "pillar",
DROP COLUMN "score",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "metrics" JSONB,
ADD COLUMN     "profileType" TEXT;

-- AlterTable
ALTER TABLE "BluetoothEvent" DROP COLUMN "fingerprint",
DROP COLUMN "manufacturer",
DROP COLUMN "model",
DROP COLUMN "name",
DROP COLUMN "sessionId",
DROP COLUMN "signalStrength",
DROP COLUMN "timestamp",
ADD COLUMN     "eventType" TEXT,
ADD COLUMN     "leadId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Borrower" ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Check" DROP COLUMN "date",
DROP COLUMN "memo",
DROP COLUMN "payee",
DROP COLUMN "pdfUrl",
DROP COLUMN "status",
DROP COLUMN "voidReason",
DROP COLUMN "voidedAt",
ADD COLUMN     "accountNumber" TEXT,
ADD COLUMN     "applicationId" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "routingNumber" TEXT,
ALTER COLUMN "checkNumber" DROP NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "bankProfileId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Disclosure" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "embedColor" TEXT,
ADD COLUMN     "fraudScore" DOUBLE PRECISION,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "fraudSignals",
ADD COLUMN     "fraudSignals" JSONB;

-- AlterTable
ALTER TABLE "FraudEvent" DROP COLUMN "anchorTxHash",
DROP COLUMN "message",
DROP COLUMN "severity",
DROP COLUMN "type",
DROP COLUMN "userId",
ADD COLUMN     "eventType" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "applicationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "FraudFlag" DROP COLUMN "checkId",
DROP COLUMN "message",
DROP COLUMN "resolved",
DROP COLUMN "severity",
ADD COLUMN     "flagType" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "reason" DROP NOT NULL;

-- AlterTable
ALTER TABLE "InvestorBehavior" ALTER COLUMN "metadata" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SarFlag" DROP COLUMN "name",
ADD COLUMN     "details" JSONB,
ADD COLUMN     "flagType" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "sarId" TEXT;

-- AlterTable
ALTER TABLE "Signer" DROP COLUMN "signatureImage",
DROP COLUMN "title",
ADD COLUMN     "metadata" JSONB,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "bankProfileId" DROP NOT NULL,
ALTER COLUMN "bankProfileId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SuspiciousActivityReport" DROP COLUMN "category",
DROP COLUMN "checkId",
DROP COLUMN "description",
DROP COLUMN "flagId",
DROP COLUMN "severity",
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "report" JSONB,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "UnderwritingCase" ADD COLUMN     "investorReasons" JSONB,
DROP COLUMN "reasons",
ADD COLUMN     "reasons" JSONB;

-- AlterTable
ALTER TABLE "UnderwritingEvent" DROP COLUMN "applicationId",
DROP COLUMN "message",
DROP COLUMN "metadata",
DROP COLUMN "type",
ADD COLUMN     "eventType" TEXT,
ADD COLUMN     "payload" JSONB,
ADD COLUMN     "underwritingCaseId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ownerId" TEXT;

-- DropTable
DROP TABLE "AnchorRecord";

-- DropTable
DROP TABLE "BluetoothAlert";

-- DropTable
DROP TABLE "BorrowerDoc";

-- DropTable
DROP TABLE "BorrowerQuote";

-- DropTable
DROP TABLE "InvestorOverlay";

-- DropTable
DROP TABLE "InvestorPricingSheet";

-- DropTable
DROP TABLE "InvestorQuote";

-- DropTable
DROP TABLE "LLPAAdjustment";

-- DropTable
DROP TABLE "LLPAGroup";

-- DropTable
DROP TABLE "LlpaGridRow";

-- DropTable
DROP TABLE "Loan";

-- DropTable
DROP TABLE "NonQMPricingRule";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "PipelineDeal";

-- DropTable
DROP TABLE "ProductOverlay";

-- DropTable
DROP TABLE "ScoringResult";

-- DropTable
DROP TABLE "StockEvent";

-- CreateTable
CREATE TABLE "EnvironmentReading" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "deviceCount" INTEGER NOT NULL,
    "bluetoothDensity" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "riskScore" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "age" INTEGER,
    "incomeVolatility" DOUBLE PRECISION,
    "ipReputation" TEXT,

    CONSTRAINT "EnvironmentReading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationMilestone" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "milestone" TEXT,
    "timestamp" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationMilestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanServicingEvent" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "eventType" TEXT,
    "payload" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanServicingEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanAmortization" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "schedule" JSONB,
    "totalInterest" DOUBLE PRECISION,
    "totalPaid" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanAmortization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanPayoff" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "payoffAmount" DOUBLE PRECISION,
    "payoffDate" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanPayoff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanDelinquency" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "daysLate" INTEGER,
    "delinquencyLevel" TEXT,
    "history" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanDelinquency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationScoringPipeline" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "pipelineName" TEXT,
    "layers" JSONB,
    "finalScore" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationScoringPipeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationWorkflowAiLayer" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "layerName" TEXT,
    "inference" JSONB,
    "confidence" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationWorkflowAiLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationAiScoring" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "modelVersion" TEXT,
    "score" DOUBLE PRECISION,
    "features" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationAiScoring_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationRiskLadder" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "ladder" JSONB,
    "finalRisk" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationRiskLadder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationComplianceLadder" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "ladder" JSONB,
    "complianceScore" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationComplianceLadder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationFraudRiskLadder" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "ladder" JSONB,
    "fraudScore" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationFraudRiskLadder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationComplianceSignalChain" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "chain" JSONB,
    "complianceScore" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationComplianceSignalChain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationFraudSignalChain" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "chain" JSONB,
    "finalScore" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationFraudSignalChain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationDocumentCompleteness" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "completenessScore" DOUBLE PRECISION,
    "missingItems" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationDocumentCompleteness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentClassification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentId" TEXT,
    "category" TEXT,
    "confidence" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "DocumentClassification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentOcrExtraction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentId" TEXT,
    "text" TEXT,
    "fields" JSONB,
    "confidence" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "DocumentOcrExtraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentVersion" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentId" TEXT,
    "version" INTEGER,
    "url" TEXT,
    "metadata" JSONB,

    CONSTRAINT "DocumentVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentLineage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentId" TEXT,
    "lineage" JSONB,
    "version" INTEGER,
    "metadata" JSONB,

    CONSTRAINT "DocumentLineage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentComplianceScore" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentId" TEXT,
    "score" DOUBLE PRECISION,
    "issues" JSONB,
    "metadata" JSONB,

    CONSTRAINT "DocumentComplianceScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentSemanticExtraction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentId" TEXT,
    "semantics" JSONB,
    "confidence" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "DocumentSemanticExtraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentStructuralAnalysis" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentId" TEXT,
    "structure" JSONB,
    "anomalies" JSONB,
    "metadata" JSONB,

    CONSTRAINT "DocumentStructuralAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentTransformationLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentId" TEXT,
    "transformationType" TEXT,
    "details" JSONB,
    "metadata" JSONB,

    CONSTRAINT "DocumentTransformationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentExtractionPipeline" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentId" TEXT,
    "pipelineName" TEXT,
    "steps" JSONB,
    "metadata" JSONB,

    CONSTRAINT "DocumentExtractionPipeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentAiClassificationLayer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentId" TEXT,
    "layerName" TEXT,
    "category" TEXT,
    "confidence" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "DocumentAiClassificationLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisclosureCompliance" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disclosureId" TEXT,
    "compliant" BOOLEAN,
    "issues" JSONB,
    "metadata" JSONB,

    CONSTRAINT "DisclosureCompliance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisclosureTracking" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disclosureId" TEXT,
    "viewedAt" TIMESTAMP(3),
    "acceptedAt" TIMESTAMP(3),
    "metadata" JSONB,

    CONSTRAINT "DisclosureTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisclosureAuditTrail" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disclosureId" TEXT,
    "eventType" TEXT,
    "timestamp" TIMESTAMP(3),
    "metadata" JSONB,

    CONSTRAINT "DisclosureAuditTrail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisclosureComplianceSnapshot" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disclosureId" TEXT,
    "compliant" BOOLEAN,
    "issues" JSONB,
    "metadata" JSONB,

    CONSTRAINT "DisclosureComplianceSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisclosureLifecycleAnalytics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disclosureId" TEXT,
    "lifecycleStage" TEXT,
    "metrics" JSONB,
    "metadata" JSONB,

    CONSTRAINT "DisclosureLifecycleAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisclosureComplianceLayer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disclosureId" TEXT,
    "layerName" TEXT,
    "complianceScore" DOUBLE PRECISION,
    "issues" JSONB,
    "metadata" JSONB,

    CONSTRAINT "DisclosureComplianceLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisclosureBehaviorAnalytics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disclosureId" TEXT,
    "behaviorScore" DOUBLE PRECISION,
    "patterns" JSONB,
    "metadata" JSONB,

    CONSTRAINT "DisclosureBehaviorAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisclosureBehaviorTrajectory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disclosureId" TEXT,
    "trajectory" JSONB,
    "behaviorScore" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "DisclosureBehaviorTrajectory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisclosureSentimentAnalytics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disclosureId" TEXT,
    "sentiment" TEXT,
    "score" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "DisclosureSentimentAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisclosureEngagementAnalytics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disclosureId" TEXT,
    "engagementScore" DOUBLE PRECISION,
    "interactions" JSONB,
    "metadata" JSONB,

    CONSTRAINT "DisclosureEngagementAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingStep" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "stepName" TEXT,
    "status" TEXT,
    "notes" TEXT,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingDecision" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "decision" TEXT,
    "reason" TEXT,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingDecision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingRule" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ruleName" TEXT,
    "description" TEXT,
    "criteria" JSONB,
    "outcome" TEXT,
    "metadata" JSONB,
    "underwritingCaseId" TEXT,

    CONSTRAINT "UnderwritingRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingRuleEvaluation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "ruleName" TEXT,
    "passed" BOOLEAN,
    "details" JSONB,
    "metadata" JSONB,
    "underwritingRuleId" TEXT,

    CONSTRAINT "UnderwritingRuleEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingAutomation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "automationType" TEXT,
    "result" TEXT,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingAutomation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingExceptionLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "exceptionType" TEXT,
    "details" JSONB,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingExceptionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingExceptionEscalation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "level" TEXT,
    "reason" TEXT,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingExceptionEscalation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingSnapshot" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "status" TEXT,
    "findings" JSONB,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingAiDecisionLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "modelVersion" TEXT,
    "decision" TEXT,
    "reasoning" JSONB,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingAiDecisionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingRuleChain" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "chainName" TEXT,
    "steps" JSONB,
    "result" TEXT,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingRuleChain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingChainAnalytics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "chainName" TEXT,
    "analytics" JSONB,
    "outcome" TEXT,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingChainAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingOverrideLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "overrideType" TEXT,
    "reason" TEXT,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingOverrideLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingProbabilisticScoring" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "probability" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingProbabilisticScoring_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingDecisionTree" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "treeStructure" JSONB,
    "finalDecision" TEXT,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingDecisionTree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingCalibrationLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "calibrationType" TEXT,
    "adjustments" JSONB,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingCalibrationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudScore" (
    "id" TEXT NOT NULL,
    "userId" INTEGER,
    "score" DOUBLE PRECISION,
    "signals" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudPipeline" (
    "id" TEXT NOT NULL,
    "userId" INTEGER,
    "layers" JSONB,
    "finalScore" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudPipeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudSignal" (
    "id" TEXT NOT NULL,
    "userId" INTEGER,
    "signalType" TEXT,
    "value" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudSignal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudCaseHistory" (
    "id" TEXT NOT NULL,
    "userId" INTEGER,
    "events" JSONB,
    "status" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudCaseHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudAiInferenceLog" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "modelVersion" TEXT,
    "score" DOUBLE PRECISION,
    "features" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudAiInferenceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudEscalation" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "level" TEXT,
    "reason" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudEscalation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudEscalationPipelineLayer" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "layerName" TEXT,
    "score" DOUBLE PRECISION,
    "signals" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudEscalationPipelineLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudAnomalyDetection" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "anomalyScore" DOUBLE PRECISION,
    "signals" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudAnomalyDetection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudFeatureStore" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "features" JSONB,
    "version" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudFeatureStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudCluster" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "clusterId" TEXT,
    "score" DOUBLE PRECISION,
    "signals" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudCluster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudTrajectoryModel" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "trajectory" JSONB,
    "riskLevel" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudTrajectoryModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudPropagationModel" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "propagationGraph" JSONB,
    "riskShift" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudPropagationModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudContagionMapping" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "contagionGraph" JSONB,
    "spreadScore" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudContagionMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudTemporalEvolution" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "evolution" JSONB,
    "riskTrend" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudTemporalEvolution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudNetworkMapping" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "networkGraph" JSONB,
    "riskNodes" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudNetworkMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudPatternEvolution" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "patterns" JSONB,
    "evolution" JSONB,
    "riskShift" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudPatternEvolution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudSignalChain" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "chain" JSONB,
    "finalScore" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudSignalChain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingEngineAudit" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "runId" TEXT,
    "parameters" JSONB,
    "result" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingEngineAudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingEngineInferenceLog" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "modelVersion" TEXT,
    "inference" JSONB,
    "finalRate" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingEngineInferenceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingComponentScoring" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "componentName" TEXT,
    "score" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingComponentScoring_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingOptimizationLayer" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "layerName" TEXT,
    "adjustments" JSONB,
    "optimizedRate" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingOptimizationLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingSensitivityLayer" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "sensitivityType" TEXT,
    "impact" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingSensitivityLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingAnomalyDetection" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "anomalyScore" DOUBLE PRECISION,
    "signals" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingAnomalyDetection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingCurveFitting" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "curveType" TEXT,
    "curveData" JSONB,
    "fitQuality" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingCurveFitting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingVolatilityTracking" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "volatilityScore" DOUBLE PRECISION,
    "history" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingVolatilityTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingElasticityAnalytics" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "elasticity" DOUBLE PRECISION,
    "behaviorImpact" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingElasticityAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BehavioralScoringLayer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "layerName" TEXT,
    "score" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "BehavioralScoringLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BehavioralTrendAnalytics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "trends" JSONB,
    "metadata" JSONB,

    CONSTRAINT "BehavioralTrendAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerBehavioralRiskLayer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "borrowerId" TEXT,
    "riskScore" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "BorrowerBehavioralRiskLayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerBehavioralDrift" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "borrowerId" TEXT,
    "drift" JSONB,
    "driftScore" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "BorrowerBehavioralDrift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerRepaymentResilience" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "borrowerId" TEXT,
    "resilienceScore" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "BorrowerRepaymentResilience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerRetentionAnalytics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "borrowerId" TEXT,
    "retentionScore" DOUBLE PRECISION,
    "signals" JSONB,
    "metadata" JSONB,

    CONSTRAINT "BorrowerRetentionAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerHardshipAnalytics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "borrowerId" TEXT,
    "hardshipScore" DOUBLE PRECISION,
    "indicators" JSONB,
    "metadata" JSONB,

    CONSTRAINT "BorrowerHardshipAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerFinancialStability" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "borrowerId" TEXT,
    "stabilityScore" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "BorrowerFinancialStability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerFinancialDrift" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "borrowerId" TEXT,
    "driftScore" DOUBLE PRECISION,
    "drift" JSONB,
    "metadata" JSONB,

    CONSTRAINT "BorrowerFinancialDrift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerMacroRiskExposure" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "borrowerId" TEXT,
    "macroFactors" JSONB,
    "exposureScore" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "BorrowerMacroRiskExposure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorScoringResult" (
    "id" TEXT NOT NULL,
    "investorId" TEXT,
    "score" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorScoringResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PipelineConversionAnalytics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stage" TEXT,
    "conversionRate" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "PipelineConversionAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PipelinePerformanceSnapshot" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "snapshotType" TEXT,
    "metrics" JSONB,
    "metadata" JSONB,

    CONSTRAINT "PipelinePerformanceSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PipelineVelocity" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stage" TEXT,
    "velocity" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "PipelineVelocity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorLiquidity" (
    "id" TEXT NOT NULL,
    "investorId" TEXT,
    "liquidityScore" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorLiquidity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorPerformanceSnapshot" (
    "id" TEXT NOT NULL,
    "investorId" TEXT,
    "metrics" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorPerformanceSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorRiskBandHistory" (
    "id" TEXT NOT NULL,
    "investorId" TEXT,
    "band" TEXT,
    "timestamp" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorRiskBandHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorCapitalFlow" (
    "id" TEXT NOT NULL,
    "investorId" TEXT,
    "flowAmount" DOUBLE PRECISION,
    "flowType" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorCapitalFlow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorAllocationDynamics" (
    "id" TEXT NOT NULL,
    "investorId" TEXT,
    "allocation" JSONB,
    "dynamics" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorAllocationDynamics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorDiversificationAnalytics" (
    "id" TEXT NOT NULL,
    "investorId" TEXT,
    "diversificationScore" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorDiversificationAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanRestructuringAnalytics" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "restructuringScore" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanRestructuringAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanCovenantTracking" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "covenants" JSONB,
    "status" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanCovenantTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanCovenantStress" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "stressScore" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanCovenantStress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanPerformanceTrajectory" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "trajectory" JSONB,
    "performanceScore" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanPerformanceTrajectory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanRepaymentCurve" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "curve" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanRepaymentCurve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanStressTest" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT,
    "stressType" TEXT,
    "results" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanStressTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationMilestone_applicationId_key" ON "ApplicationMilestone"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanServicingEvent_applicationId_key" ON "LoanServicingEvent"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanAmortization_applicationId_key" ON "LoanAmortization"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanPayoff_applicationId_key" ON "LoanPayoff"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanDelinquency_applicationId_key" ON "LoanDelinquency"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentClassification_documentId_key" ON "DocumentClassification"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentOcrExtraction_documentId_key" ON "DocumentOcrExtraction"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentVersion_documentId_key" ON "DocumentVersion"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentLineage_documentId_key" ON "DocumentLineage"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentComplianceScore_documentId_key" ON "DocumentComplianceScore"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentSemanticExtraction_documentId_key" ON "DocumentSemanticExtraction"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentStructuralAnalysis_documentId_key" ON "DocumentStructuralAnalysis"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentTransformationLog_documentId_key" ON "DocumentTransformationLog"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentExtractionPipeline_documentId_key" ON "DocumentExtractionPipeline"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentAiClassificationLayer_documentId_key" ON "DocumentAiClassificationLayer"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "DisclosureCompliance_disclosureId_key" ON "DisclosureCompliance"("disclosureId");

-- CreateIndex
CREATE UNIQUE INDEX "DisclosureTracking_disclosureId_key" ON "DisclosureTracking"("disclosureId");

-- CreateIndex
CREATE UNIQUE INDEX "DisclosureAuditTrail_disclosureId_key" ON "DisclosureAuditTrail"("disclosureId");

-- CreateIndex
CREATE UNIQUE INDEX "DisclosureComplianceSnapshot_disclosureId_key" ON "DisclosureComplianceSnapshot"("disclosureId");

-- CreateIndex
CREATE UNIQUE INDEX "DisclosureLifecycleAnalytics_disclosureId_key" ON "DisclosureLifecycleAnalytics"("disclosureId");

-- CreateIndex
CREATE UNIQUE INDEX "DisclosureComplianceLayer_disclosureId_key" ON "DisclosureComplianceLayer"("disclosureId");

-- CreateIndex
CREATE UNIQUE INDEX "DisclosureBehaviorAnalytics_disclosureId_key" ON "DisclosureBehaviorAnalytics"("disclosureId");

-- CreateIndex
CREATE UNIQUE INDEX "DisclosureBehaviorTrajectory_disclosureId_key" ON "DisclosureBehaviorTrajectory"("disclosureId");

-- CreateIndex
CREATE UNIQUE INDEX "DisclosureSentimentAnalytics_disclosureId_key" ON "DisclosureSentimentAnalytics"("disclosureId");

-- CreateIndex
CREATE UNIQUE INDEX "DisclosureEngagementAnalytics_disclosureId_key" ON "DisclosureEngagementAnalytics"("disclosureId");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingStep_underwritingCaseId_key" ON "UnderwritingStep"("underwritingCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingDecision_underwritingCaseId_key" ON "UnderwritingDecision"("underwritingCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingRuleEvaluation_underwritingCaseId_key" ON "UnderwritingRuleEvaluation"("underwritingCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingAutomation_underwritingCaseId_key" ON "UnderwritingAutomation"("underwritingCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingExceptionLog_underwritingCaseId_key" ON "UnderwritingExceptionLog"("underwritingCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingExceptionEscalation_underwritingCaseId_key" ON "UnderwritingExceptionEscalation"("underwritingCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingSnapshot_underwritingCaseId_key" ON "UnderwritingSnapshot"("underwritingCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingAiDecisionLog_underwritingCaseId_key" ON "UnderwritingAiDecisionLog"("underwritingCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingRuleChain_underwritingCaseId_key" ON "UnderwritingRuleChain"("underwritingCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingChainAnalytics_underwritingCaseId_key" ON "UnderwritingChainAnalytics"("underwritingCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingOverrideLog_underwritingCaseId_key" ON "UnderwritingOverrideLog"("underwritingCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingProbabilisticScoring_underwritingCaseId_key" ON "UnderwritingProbabilisticScoring"("underwritingCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingDecisionTree_underwritingCaseId_key" ON "UnderwritingDecisionTree"("underwritingCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingCalibrationLog_underwritingCaseId_key" ON "UnderwritingCalibrationLog"("underwritingCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudAiInferenceLog_applicationId_key" ON "FraudAiInferenceLog"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudEscalation_applicationId_key" ON "FraudEscalation"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudEscalationPipelineLayer_applicationId_key" ON "FraudEscalationPipelineLayer"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudAnomalyDetection_applicationId_key" ON "FraudAnomalyDetection"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudFeatureStore_applicationId_key" ON "FraudFeatureStore"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudCluster_applicationId_key" ON "FraudCluster"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudTrajectoryModel_applicationId_key" ON "FraudTrajectoryModel"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudPropagationModel_applicationId_key" ON "FraudPropagationModel"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudContagionMapping_applicationId_key" ON "FraudContagionMapping"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudTemporalEvolution_applicationId_key" ON "FraudTemporalEvolution"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudNetworkMapping_applicationId_key" ON "FraudNetworkMapping"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudPatternEvolution_applicationId_key" ON "FraudPatternEvolution"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudSignalChain_applicationId_key" ON "FraudSignalChain"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "PricingEngineAudit_applicationId_key" ON "PricingEngineAudit"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "PricingEngineInferenceLog_applicationId_key" ON "PricingEngineInferenceLog"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "PricingComponentScoring_applicationId_key" ON "PricingComponentScoring"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "PricingOptimizationLayer_applicationId_key" ON "PricingOptimizationLayer"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "PricingSensitivityLayer_applicationId_key" ON "PricingSensitivityLayer"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "PricingAnomalyDetection_applicationId_key" ON "PricingAnomalyDetection"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "PricingCurveFitting_applicationId_key" ON "PricingCurveFitting"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "PricingVolatilityTracking_applicationId_key" ON "PricingVolatilityTracking"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "PricingElasticityAnalytics_applicationId_key" ON "PricingElasticityAnalytics"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanRestructuringAnalytics_applicationId_key" ON "LoanRestructuringAnalytics"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanCovenantTracking_applicationId_key" ON "LoanCovenantTracking"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanCovenantStress_applicationId_key" ON "LoanCovenantStress"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanPerformanceTrajectory_applicationId_key" ON "LoanPerformanceTrajectory"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanRepaymentCurve_applicationId_key" ON "LoanRepaymentCurve"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanStressTest_applicationId_key" ON "LoanStressTest"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Check_applicationId_key" ON "Check"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudEvent_applicationId_key" ON "FraudEvent"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Timeline_applicationId_key" ON "Timeline"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "TimelineEvent_applicationId_key" ON "TimelineEvent"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingEvent_underwritingCaseId_key" ON "UnderwritingEvent"("underwritingCaseId");

-- AddForeignKey
ALTER TABLE "ApplicationMilestone" ADD CONSTRAINT "ApplicationMilestone_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanServicingEvent" ADD CONSTRAINT "LoanServicingEvent_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanAmortization" ADD CONSTRAINT "LoanAmortization_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanPayoff" ADD CONSTRAINT "LoanPayoff_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanDelinquency" ADD CONSTRAINT "LoanDelinquency_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationScoringPipeline" ADD CONSTRAINT "ApplicationScoringPipeline_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationWorkflowAiLayer" ADD CONSTRAINT "ApplicationWorkflowAiLayer_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationAiScoring" ADD CONSTRAINT "ApplicationAiScoring_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationRiskLadder" ADD CONSTRAINT "ApplicationRiskLadder_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationComplianceLadder" ADD CONSTRAINT "ApplicationComplianceLadder_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationFraudRiskLadder" ADD CONSTRAINT "ApplicationFraudRiskLadder_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationComplianceSignalChain" ADD CONSTRAINT "ApplicationComplianceSignalChain_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationFraudSignalChain" ADD CONSTRAINT "ApplicationFraudSignalChain_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationDocumentCompleteness" ADD CONSTRAINT "ApplicationDocumentCompleteness_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentClassification" ADD CONSTRAINT "DocumentClassification_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentOcrExtraction" ADD CONSTRAINT "DocumentOcrExtraction_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentVersion" ADD CONSTRAINT "DocumentVersion_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentLineage" ADD CONSTRAINT "DocumentLineage_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentComplianceScore" ADD CONSTRAINT "DocumentComplianceScore_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentSemanticExtraction" ADD CONSTRAINT "DocumentSemanticExtraction_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentStructuralAnalysis" ADD CONSTRAINT "DocumentStructuralAnalysis_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentTransformationLog" ADD CONSTRAINT "DocumentTransformationLog_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentExtractionPipeline" ADD CONSTRAINT "DocumentExtractionPipeline_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentAiClassificationLayer" ADD CONSTRAINT "DocumentAiClassificationLayer_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisclosureCompliance" ADD CONSTRAINT "DisclosureCompliance_disclosureId_fkey" FOREIGN KEY ("disclosureId") REFERENCES "Disclosure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisclosureTracking" ADD CONSTRAINT "DisclosureTracking_disclosureId_fkey" FOREIGN KEY ("disclosureId") REFERENCES "Disclosure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisclosureAuditTrail" ADD CONSTRAINT "DisclosureAuditTrail_disclosureId_fkey" FOREIGN KEY ("disclosureId") REFERENCES "Disclosure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisclosureComplianceSnapshot" ADD CONSTRAINT "DisclosureComplianceSnapshot_disclosureId_fkey" FOREIGN KEY ("disclosureId") REFERENCES "Disclosure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisclosureLifecycleAnalytics" ADD CONSTRAINT "DisclosureLifecycleAnalytics_disclosureId_fkey" FOREIGN KEY ("disclosureId") REFERENCES "Disclosure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisclosureComplianceLayer" ADD CONSTRAINT "DisclosureComplianceLayer_disclosureId_fkey" FOREIGN KEY ("disclosureId") REFERENCES "Disclosure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisclosureBehaviorAnalytics" ADD CONSTRAINT "DisclosureBehaviorAnalytics_disclosureId_fkey" FOREIGN KEY ("disclosureId") REFERENCES "Disclosure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisclosureBehaviorTrajectory" ADD CONSTRAINT "DisclosureBehaviorTrajectory_disclosureId_fkey" FOREIGN KEY ("disclosureId") REFERENCES "Disclosure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisclosureSentimentAnalytics" ADD CONSTRAINT "DisclosureSentimentAnalytics_disclosureId_fkey" FOREIGN KEY ("disclosureId") REFERENCES "Disclosure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisclosureEngagementAnalytics" ADD CONSTRAINT "DisclosureEngagementAnalytics_disclosureId_fkey" FOREIGN KEY ("disclosureId") REFERENCES "Disclosure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingEvent" ADD CONSTRAINT "UnderwritingEvent_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingStep" ADD CONSTRAINT "UnderwritingStep_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingDecision" ADD CONSTRAINT "UnderwritingDecision_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingRule" ADD CONSTRAINT "UnderwritingRule_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingRuleEvaluation" ADD CONSTRAINT "UnderwritingRuleEvaluation_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingRuleEvaluation" ADD CONSTRAINT "UnderwritingRuleEvaluation_underwritingRuleId_fkey" FOREIGN KEY ("underwritingRuleId") REFERENCES "UnderwritingRule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingAutomation" ADD CONSTRAINT "UnderwritingAutomation_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingExceptionLog" ADD CONSTRAINT "UnderwritingExceptionLog_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingExceptionEscalation" ADD CONSTRAINT "UnderwritingExceptionEscalation_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingSnapshot" ADD CONSTRAINT "UnderwritingSnapshot_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingAiDecisionLog" ADD CONSTRAINT "UnderwritingAiDecisionLog_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingRuleChain" ADD CONSTRAINT "UnderwritingRuleChain_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingChainAnalytics" ADD CONSTRAINT "UnderwritingChainAnalytics_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingOverrideLog" ADD CONSTRAINT "UnderwritingOverrideLog_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingProbabilisticScoring" ADD CONSTRAINT "UnderwritingProbabilisticScoring_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingDecisionTree" ADD CONSTRAINT "UnderwritingDecisionTree_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingCalibrationLog" ADD CONSTRAINT "UnderwritingCalibrationLog_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudScore" ADD CONSTRAINT "FraudScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudEvent" ADD CONSTRAINT "FraudEvent_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudPipeline" ADD CONSTRAINT "FraudPipeline_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudSignal" ADD CONSTRAINT "FraudSignal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudCaseHistory" ADD CONSTRAINT "FraudCaseHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudFlag" ADD CONSTRAINT "FraudFlag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuspiciousActivityReport" ADD CONSTRAINT "SuspiciousActivityReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SarFlag" ADD CONSTRAINT "SarFlag_sarId_fkey" FOREIGN KEY ("sarId") REFERENCES "SuspiciousActivityReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudAiInferenceLog" ADD CONSTRAINT "FraudAiInferenceLog_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudEscalation" ADD CONSTRAINT "FraudEscalation_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudEscalationPipelineLayer" ADD CONSTRAINT "FraudEscalationPipelineLayer_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudAnomalyDetection" ADD CONSTRAINT "FraudAnomalyDetection_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudFeatureStore" ADD CONSTRAINT "FraudFeatureStore_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudCluster" ADD CONSTRAINT "FraudCluster_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudTrajectoryModel" ADD CONSTRAINT "FraudTrajectoryModel_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudPropagationModel" ADD CONSTRAINT "FraudPropagationModel_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudContagionMapping" ADD CONSTRAINT "FraudContagionMapping_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudTemporalEvolution" ADD CONSTRAINT "FraudTemporalEvolution_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudNetworkMapping" ADD CONSTRAINT "FraudNetworkMapping_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudPatternEvolution" ADD CONSTRAINT "FraudPatternEvolution_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudSignalChain" ADD CONSTRAINT "FraudSignalChain_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingEngineAudit" ADD CONSTRAINT "PricingEngineAudit_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingEngineInferenceLog" ADD CONSTRAINT "PricingEngineInferenceLog_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingComponentScoring" ADD CONSTRAINT "PricingComponentScoring_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingOptimizationLayer" ADD CONSTRAINT "PricingOptimizationLayer_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingSensitivityLayer" ADD CONSTRAINT "PricingSensitivityLayer_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingAnomalyDetection" ADD CONSTRAINT "PricingAnomalyDetection_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingCurveFitting" ADD CONSTRAINT "PricingCurveFitting_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingVolatilityTracking" ADD CONSTRAINT "PricingVolatilityTracking_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingElasticityAnalytics" ADD CONSTRAINT "PricingElasticityAnalytics_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviorEvent" ADD CONSTRAINT "BehaviorEvent_behaviorProfileId_fkey" FOREIGN KEY ("behaviorProfileId") REFERENCES "BehaviorProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehavioralScoringLayer" ADD CONSTRAINT "BehavioralScoringLayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehavioralTrendAnalytics" ADD CONSTRAINT "BehavioralTrendAnalytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerBehavioralRiskLayer" ADD CONSTRAINT "BorrowerBehavioralRiskLayer_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerBehavioralDrift" ADD CONSTRAINT "BorrowerBehavioralDrift_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerRepaymentResilience" ADD CONSTRAINT "BorrowerRepaymentResilience_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerRetentionAnalytics" ADD CONSTRAINT "BorrowerRetentionAnalytics_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerHardshipAnalytics" ADD CONSTRAINT "BorrowerHardshipAnalytics_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerFinancialStability" ADD CONSTRAINT "BorrowerFinancialStability_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerFinancialDrift" ADD CONSTRAINT "BorrowerFinancialDrift_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerMacroRiskExposure" ADD CONSTRAINT "BorrowerMacroRiskExposure_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BluetoothEvent" ADD CONSTRAINT "BluetoothEvent_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorScoringResult" ADD CONSTRAINT "InvestorScoringResult_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorLiquidity" ADD CONSTRAINT "InvestorLiquidity_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorPerformanceSnapshot" ADD CONSTRAINT "InvestorPerformanceSnapshot_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorRiskBandHistory" ADD CONSTRAINT "InvestorRiskBandHistory_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorCapitalFlow" ADD CONSTRAINT "InvestorCapitalFlow_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorAllocationDynamics" ADD CONSTRAINT "InvestorAllocationDynamics_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorDiversificationAnalytics" ADD CONSTRAINT "InvestorDiversificationAnalytics_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanRestructuringAnalytics" ADD CONSTRAINT "LoanRestructuringAnalytics_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanCovenantTracking" ADD CONSTRAINT "LoanCovenantTracking_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanCovenantStress" ADD CONSTRAINT "LoanCovenantStress_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanPerformanceTrajectory" ADD CONSTRAINT "LoanPerformanceTrajectory_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanRepaymentCurve" ADD CONSTRAINT "LoanRepaymentCurve_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanStressTest" ADD CONSTRAINT "LoanStressTest_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Check" ADD CONSTRAINT "Check_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Check" ADD CONSTRAINT "Check_bankProfileId_fkey" FOREIGN KEY ("bankProfileId") REFERENCES "BankProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signer" ADD CONSTRAINT "Signer_bankProfileId_fkey" FOREIGN KEY ("bankProfileId") REFERENCES "BankProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
