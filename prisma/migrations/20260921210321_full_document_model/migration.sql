/*
  Warnings:

  - You are about to drop the column `features` on the `ApplicationAiScoring` table. All the data in the column will be lost.
  - You are about to drop the column `modelVersion` on the `ApplicationAiScoring` table. All the data in the column will be lost.
  - You are about to drop the column `complianceScore` on the `ApplicationComplianceLadder` table. All the data in the column will be lost.
  - You are about to drop the column `complianceScore` on the `ApplicationComplianceSignalChain` table. All the data in the column will be lost.
  - You are about to drop the column `missingItems` on the `ApplicationDocumentCompleteness` table. All the data in the column will be lost.
  - You are about to drop the column `fraudScore` on the `ApplicationFraudRiskLadder` table. All the data in the column will be lost.
  - You are about to drop the column `finalScore` on the `ApplicationFraudSignalChain` table. All the data in the column will be lost.
  - You are about to drop the column `finalRisk` on the `ApplicationRiskLadder` table. All the data in the column will be lost.
  - You are about to drop the column `layers` on the `ApplicationScoringPipeline` table. All the data in the column will be lost.
  - You are about to drop the column `confidence` on the `ApplicationWorkflowAiLayer` table. All the data in the column will be lost.
  - You are about to drop the column `inference` on the `ApplicationWorkflowAiLayer` table. All the data in the column will be lost.
  - The `userId` column on the `Borrower` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `fraudSignals` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `documentId` on the `DocumentExtractionPipeline` table. All the data in the column will be lost.
  - You are about to drop the column `documentId` on the `DocumentStructuralAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `DocumentVersion` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `DocumentVersion` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `FraudAiInferenceLog` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `FraudAiInferenceLog` table. All the data in the column will be lost.
  - You are about to drop the column `events` on the `FraudCaseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `FraudCaseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `FraudCluster` table. All the data in the column will be lost.
  - You are about to drop the column `contagionGraph` on the `FraudContagionMapping` table. All the data in the column will be lost.
  - You are about to drop the column `spreadScore` on the `FraudContagionMapping` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `FraudEscalation` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `FraudEscalationPipelineLayer` table. All the data in the column will be lost.
  - You are about to drop the column `signals` on the `FraudEscalationPipelineLayer` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `FraudFeatureStore` table. All the data in the column will be lost.
  - You are about to drop the column `networkGraph` on the `FraudNetworkMapping` table. All the data in the column will be lost.
  - You are about to drop the column `riskNodes` on the `FraudNetworkMapping` table. All the data in the column will be lost.
  - You are about to drop the column `evolution` on the `FraudPatternEvolution` table. All the data in the column will be lost.
  - You are about to drop the column `riskShift` on the `FraudPatternEvolution` table. All the data in the column will be lost.
  - You are about to drop the column `layers` on the `FraudPipeline` table. All the data in the column will be lost.
  - You are about to drop the column `propagationGraph` on the `FraudPropagationModel` table. All the data in the column will be lost.
  - You are about to drop the column `riskShift` on the `FraudPropagationModel` table. All the data in the column will be lost.
  - You are about to drop the column `signals` on the `FraudScore` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `FraudSignal` table. All the data in the column will be lost.
  - You are about to drop the column `finalScore` on the `FraudSignalChain` table. All the data in the column will be lost.
  - You are about to drop the column `riskTrend` on the `FraudTemporalEvolution` table. All the data in the column will be lost.
  - You are about to drop the column `riskLevel` on the `FraudTrajectoryModel` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `InvestorScoringResult` table. All the data in the column will be lost.
  - You are about to drop the column `totalInterest` on the `LoanAmortization` table. All the data in the column will be lost.
  - You are about to drop the column `totalPaid` on the `LoanAmortization` table. All the data in the column will be lost.
  - You are about to drop the column `delinquencyLevel` on the `LoanDelinquency` table. All the data in the column will be lost.
  - You are about to drop the column `history` on the `LoanDelinquency` table. All the data in the column will be lost.
  - You are about to drop the column `parameters` on the `PricingEngineAudit` table. All the data in the column will be lost.
  - You are about to drop the column `result` on the `PricingEngineAudit` table. All the data in the column will be lost.
  - You are about to drop the column `runId` on the `PricingEngineAudit` table. All the data in the column will be lost.
  - You are about to drop the column `finalRate` on the `PricingEngineInferenceLog` table. All the data in the column will be lost.
  - You are about to drop the column `report` on the `SuspiciousActivityReport` table. All the data in the column will be lost.
  - You are about to drop the column `reasoning` on the `UnderwritingAiDecisionLog` table. All the data in the column will be lost.
  - The `result` column on the `UnderwritingAutomation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `adjustments` on the `UnderwritingCalibrationLog` table. All the data in the column will be lost.
  - You are about to drop the column `chainName` on the `UnderwritingChainAnalytics` table. All the data in the column will be lost.
  - You are about to drop the column `outcome` on the `UnderwritingChainAnalytics` table. All the data in the column will be lost.
  - You are about to drop the column `finalDecision` on the `UnderwritingDecisionTree` table. All the data in the column will be lost.
  - You are about to drop the column `treeStructure` on the `UnderwritingDecisionTree` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `UnderwritingExceptionEscalation` table. All the data in the column will be lost.
  - You are about to drop the column `factors` on the `UnderwritingProbabilisticScoring` table. All the data in the column will be lost.
  - You are about to drop the column `probability` on the `UnderwritingProbabilisticScoring` table. All the data in the column will be lost.
  - You are about to drop the column `chainName` on the `UnderwritingRuleChain` table. All the data in the column will be lost.
  - You are about to drop the column `result` on the `UnderwritingRuleChain` table. All the data in the column will be lost.
  - You are about to drop the column `steps` on the `UnderwritingRuleChain` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `UnderwritingRuleEvaluation` table. All the data in the column will be lost.
  - You are about to drop the column `ruleName` on the `UnderwritingRuleEvaluation` table. All the data in the column will be lost.
  - You are about to drop the column `underwritingRuleId` on the `UnderwritingRuleEvaluation` table. All the data in the column will be lost.
  - You are about to drop the column `findings` on the `UnderwritingSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `UnderwritingSnapshot` table. All the data in the column will be lost.
  - You are about to drop the `SarFlag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[applicationId]` on the table `ApplicationAiScoring` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationId]` on the table `ApplicationComplianceLadder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationId]` on the table `ApplicationComplianceSignalChain` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationId]` on the table `ApplicationDocumentCompleteness` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationId]` on the table `ApplicationFraudRiskLadder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationId]` on the table `ApplicationFraudSignalChain` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationId]` on the table `ApplicationRiskLadder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationId]` on the table `ApplicationScoringPipeline` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationId]` on the table `ApplicationWorkflowAiLayer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Borrower` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[borrowerId]` on the table `BorrowerBehavioralDrift` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[borrowerId]` on the table `BorrowerBehavioralRiskLayer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[borrowerId]` on the table `BorrowerFinancialDrift` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[borrowerId]` on the table `BorrowerFinancialStability` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[borrowerId]` on the table `BorrowerHardshipAnalytics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[borrowerId]` on the table `BorrowerMacroRiskExposure` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[borrowerId]` on the table `BorrowerRepaymentResilience` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[borrowerId]` on the table `BorrowerRetentionAnalytics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[anchorRecordId]` on the table `Check` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[structuralAnalysisId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[extractionPipelineId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[structuralLegacyId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documentSingleId]` on the table `DocumentExtractionPipeline` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documentMainId]` on the table `DocumentStructuralAnalysis` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documentLegacyId]` on the table `DocumentStructuralAnalysis` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `InvestorScoringResult` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `UnderwritingCase` will be added. If there are existing duplicate values, this will fail.
  - Made the column `disclosureId` on table `DisclosureBehaviorAnalytics` required. This step will fail if there are existing NULL values in that column.
  - Made the column `disclosureId` on table `DisclosureBehaviorTrajectory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `disclosureId` on table `DisclosureComplianceLayer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `disclosureId` on table `DisclosureEngagementAnalytics` required. This step will fail if there are existing NULL values in that column.
  - Made the column `disclosureId` on table `DisclosureLifecycleAnalytics` required. This step will fail if there are existing NULL values in that column.
  - Made the column `disclosureId` on table `DisclosureSentimentAnalytics` required. This step will fail if there are existing NULL values in that column.
  - Made the column `documentId` on table `DocumentLineage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `LoanAmortization` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `LoanDelinquency` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicationId` on table `LoanPayoff` required. This step will fail if there are existing NULL values in that column.
  - Made the column `underwritingCaseId` on table `UnderwritingDecisionTree` required. This step will fail if there are existing NULL values in that column.
  - Made the column `underwritingCaseId` on table `UnderwritingProbabilisticScoring` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_borrowerId_fkey";

-- DropForeignKey
ALTER TABLE "DisclosureBehaviorAnalytics" DROP CONSTRAINT "DisclosureBehaviorAnalytics_disclosureId_fkey";

-- DropForeignKey
ALTER TABLE "DisclosureBehaviorTrajectory" DROP CONSTRAINT "DisclosureBehaviorTrajectory_disclosureId_fkey";

-- DropForeignKey
ALTER TABLE "DisclosureComplianceLayer" DROP CONSTRAINT "DisclosureComplianceLayer_disclosureId_fkey";

-- DropForeignKey
ALTER TABLE "DisclosureEngagementAnalytics" DROP CONSTRAINT "DisclosureEngagementAnalytics_disclosureId_fkey";

-- DropForeignKey
ALTER TABLE "DisclosureLifecycleAnalytics" DROP CONSTRAINT "DisclosureLifecycleAnalytics_disclosureId_fkey";

-- DropForeignKey
ALTER TABLE "DisclosureSentimentAnalytics" DROP CONSTRAINT "DisclosureSentimentAnalytics_disclosureId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentExtractionPipeline" DROP CONSTRAINT "DocumentExtractionPipeline_documentId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentLineage" DROP CONSTRAINT "DocumentLineage_documentId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentStructuralAnalysis" DROP CONSTRAINT "DocumentStructuralAnalysis_documentId_fkey";

-- DropForeignKey
ALTER TABLE "LoanAmortization" DROP CONSTRAINT "LoanAmortization_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "LoanDelinquency" DROP CONSTRAINT "LoanDelinquency_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "LoanPayoff" DROP CONSTRAINT "LoanPayoff_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "SarFlag" DROP CONSTRAINT "SarFlag_sarId_fkey";

-- DropForeignKey
ALTER TABLE "UnderwritingDecisionTree" DROP CONSTRAINT "UnderwritingDecisionTree_underwritingCaseId_fkey";

-- DropForeignKey
ALTER TABLE "UnderwritingProbabilisticScoring" DROP CONSTRAINT "UnderwritingProbabilisticScoring_underwritingCaseId_fkey";

-- DropForeignKey
ALTER TABLE "UnderwritingRuleEvaluation" DROP CONSTRAINT "UnderwritingRuleEvaluation_underwritingRuleId_fkey";

-- DropIndex
DROP INDEX "ApplicationMilestone_applicationId_key";

-- DropIndex
DROP INDEX "DisclosureAuditTrail_disclosureId_key";

-- DropIndex
DROP INDEX "DisclosureCompliance_disclosureId_key";

-- DropIndex
DROP INDEX "DisclosureComplianceSnapshot_disclosureId_key";

-- DropIndex
DROP INDEX "DisclosureTracking_disclosureId_key";

-- DropIndex
DROP INDEX "DocumentAiClassificationLayer_documentId_key";

-- DropIndex
DROP INDEX "DocumentClassification_documentId_key";

-- DropIndex
DROP INDEX "DocumentExtractionPipeline_documentId_key";

-- DropIndex
DROP INDEX "DocumentOcrExtraction_documentId_key";

-- DropIndex
DROP INDEX "DocumentStructuralAnalysis_documentId_key";

-- DropIndex
DROP INDEX "DocumentTransformationLog_documentId_key";

-- DropIndex
DROP INDEX "DocumentVersion_documentId_key";

-- DropIndex
DROP INDEX "FraudEvent_applicationId_key";

-- DropIndex
DROP INDEX "LoanServicingEvent_applicationId_key";

-- DropIndex
DROP INDEX "Timeline_applicationId_key";

-- DropIndex
DROP INDEX "TimelineEvent_applicationId_key";

-- DropIndex
DROP INDEX "UnderwritingAiDecisionLog_underwritingCaseId_key";

-- DropIndex
DROP INDEX "UnderwritingAutomation_underwritingCaseId_key";

-- DropIndex
DROP INDEX "UnderwritingCalibrationLog_underwritingCaseId_key";

-- DropIndex
DROP INDEX "UnderwritingChainAnalytics_underwritingCaseId_key";

-- DropIndex
DROP INDEX "UnderwritingDecision_underwritingCaseId_key";

-- DropIndex
DROP INDEX "UnderwritingEvent_underwritingCaseId_key";

-- DropIndex
DROP INDEX "UnderwritingExceptionEscalation_underwritingCaseId_key";

-- DropIndex
DROP INDEX "UnderwritingExceptionLog_underwritingCaseId_key";

-- DropIndex
DROP INDEX "UnderwritingOverrideLog_underwritingCaseId_key";

-- DropIndex
DROP INDEX "UnderwritingRuleChain_underwritingCaseId_key";

-- DropIndex
DROP INDEX "UnderwritingRuleEvaluation_underwritingCaseId_key";

-- DropIndex
DROP INDEX "UnderwritingSnapshot_underwritingCaseId_key";

-- DropIndex
DROP INDEX "UnderwritingStep_underwritingCaseId_key";

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "borrowerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ApplicationAiScoring" DROP COLUMN "features",
DROP COLUMN "modelVersion",
ADD COLUMN     "factors" JSONB;

-- AlterTable
ALTER TABLE "ApplicationComplianceLadder" DROP COLUMN "complianceScore";

-- AlterTable
ALTER TABLE "ApplicationComplianceSignalChain" DROP COLUMN "complianceScore";

-- AlterTable
ALTER TABLE "ApplicationDocumentCompleteness" DROP COLUMN "missingItems",
ADD COLUMN     "missingDocuments" JSONB;

-- AlterTable
ALTER TABLE "ApplicationFraudRiskLadder" DROP COLUMN "fraudScore";

-- AlterTable
ALTER TABLE "ApplicationFraudSignalChain" DROP COLUMN "finalScore";

-- AlterTable
ALTER TABLE "ApplicationRiskLadder" DROP COLUMN "finalRisk";

-- AlterTable
ALTER TABLE "ApplicationScoringPipeline" DROP COLUMN "layers",
ADD COLUMN     "steps" JSONB;

-- AlterTable
ALTER TABLE "ApplicationWorkflowAiLayer" DROP COLUMN "confidence",
DROP COLUMN "inference",
ADD COLUMN     "output" JSONB;

-- AlterTable
ALTER TABLE "BankProfile" ADD COLUMN     "accountNumber" TEXT,
ADD COLUMN     "accountType" TEXT,
ADD COLUMN     "bankName" TEXT,
ADD COLUMN     "nextCheckNumber" INTEGER,
ADD COLUMN     "signatureImage" TEXT,
ADD COLUMN     "signerName" TEXT;

-- AlterTable
ALTER TABLE "Borrower" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Check" ADD COLUMN     "anchorRecordId" TEXT,
ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "memo" TEXT,
ADD COLUMN     "payee" TEXT,
ADD COLUMN     "pdfUrl" TEXT,
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "DisclosureBehaviorAnalytics" ALTER COLUMN "disclosureId" SET NOT NULL;

-- AlterTable
ALTER TABLE "DisclosureBehaviorTrajectory" ALTER COLUMN "disclosureId" SET NOT NULL;

-- AlterTable
ALTER TABLE "DisclosureComplianceLayer" ALTER COLUMN "disclosureId" SET NOT NULL;

-- AlterTable
ALTER TABLE "DisclosureEngagementAnalytics" ALTER COLUMN "disclosureId" SET NOT NULL;

-- AlterTable
ALTER TABLE "DisclosureLifecycleAnalytics" ALTER COLUMN "disclosureId" SET NOT NULL;

-- AlterTable
ALTER TABLE "DisclosureSentimentAnalytics" ALTER COLUMN "disclosureId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "fraudSignals",
ADD COLUMN     "extractionPipelineId" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "structuralAnalysisId" TEXT,
ADD COLUMN     "structuralLegacyId" TEXT;

-- AlterTable
ALTER TABLE "DocumentExtractionPipeline" DROP COLUMN "documentId",
ADD COLUMN     "documentSingleId" TEXT,
ADD COLUMN     "parentDocumentId" TEXT;

-- AlterTable
ALTER TABLE "DocumentLineage" ALTER COLUMN "documentId" SET NOT NULL;

-- AlterTable
ALTER TABLE "DocumentStructuralAnalysis" DROP COLUMN "documentId",
ADD COLUMN     "documentLegacyId" TEXT,
ADD COLUMN     "documentMainId" TEXT;

-- AlterTable
ALTER TABLE "DocumentVersion" DROP COLUMN "url",
DROP COLUMN "version",
ADD COLUMN     "versionNumber" INTEGER;

-- AlterTable
ALTER TABLE "FraudAiInferenceLog" DROP COLUMN "features",
DROP COLUMN "score",
ADD COLUMN     "confidence" DOUBLE PRECISION,
ADD COLUMN     "inference" JSONB;

-- AlterTable
ALTER TABLE "FraudCaseHistory" DROP COLUMN "events",
DROP COLUMN "status",
ADD COLUMN     "caseType" TEXT,
ADD COLUMN     "details" JSONB;

-- AlterTable
ALTER TABLE "FraudCluster" DROP COLUMN "score";

-- AlterTable
ALTER TABLE "FraudContagionMapping" DROP COLUMN "contagionGraph",
DROP COLUMN "spreadScore",
ADD COLUMN     "contagion" JSONB;

-- AlterTable
ALTER TABLE "FraudEscalation" DROP COLUMN "level",
ADD COLUMN     "escalationLevel" TEXT;

-- AlterTable
ALTER TABLE "FraudEscalationPipelineLayer" DROP COLUMN "score",
DROP COLUMN "signals",
ADD COLUMN     "output" JSONB;

-- AlterTable
ALTER TABLE "FraudEvent" ADD COLUMN     "anchorTxHash" TEXT,
ADD COLUMN     "signal" JSONB,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "FraudFeatureStore" DROP COLUMN "version";

-- AlterTable
ALTER TABLE "FraudFlag" ADD COLUMN     "checkId" TEXT;

-- AlterTable
ALTER TABLE "FraudNetworkMapping" DROP COLUMN "networkGraph",
DROP COLUMN "riskNodes",
ADD COLUMN     "network" JSONB;

-- AlterTable
ALTER TABLE "FraudPatternEvolution" DROP COLUMN "evolution",
DROP COLUMN "riskShift";

-- AlterTable
ALTER TABLE "FraudPipeline" DROP COLUMN "layers",
ADD COLUMN     "pipelineName" TEXT,
ADD COLUMN     "steps" JSONB;

-- AlterTable
ALTER TABLE "FraudPropagationModel" DROP COLUMN "propagationGraph",
DROP COLUMN "riskShift",
ADD COLUMN     "propagation" JSONB;

-- AlterTable
ALTER TABLE "FraudScore" DROP COLUMN "signals",
ADD COLUMN     "factors" JSONB;

-- AlterTable
ALTER TABLE "FraudSignal" DROP COLUMN "value",
ADD COLUMN     "strength" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "FraudSignalChain" DROP COLUMN "finalScore";

-- AlterTable
ALTER TABLE "FraudTemporalEvolution" DROP COLUMN "riskTrend";

-- AlterTable
ALTER TABLE "FraudTrajectoryModel" DROP COLUMN "riskLevel";

-- AlterTable
ALTER TABLE "InvestorScoringResult" DROP COLUMN "score",
ADD COLUMN     "fraudScore" DOUBLE PRECISION,
ADD COLUMN     "impulsivenessScore" DOUBLE PRECISION,
ADD COLUMN     "riskScore" DOUBLE PRECISION,
ADD COLUMN     "signals" JSONB,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "LoanAmortization" DROP COLUMN "totalInterest",
DROP COLUMN "totalPaid",
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "LoanDelinquency" DROP COLUMN "delinquencyLevel",
DROP COLUMN "history",
ADD COLUMN     "delinquencyStatus" TEXT,
ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "LoanPayoff" ALTER COLUMN "applicationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "PricingEngineAudit" DROP COLUMN "parameters",
DROP COLUMN "result",
DROP COLUMN "runId",
ADD COLUMN     "auditType" TEXT,
ADD COLUMN     "details" JSONB;

-- AlterTable
ALTER TABLE "PricingEngineInferenceLog" DROP COLUMN "finalRate",
ADD COLUMN     "confidence" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "SuspiciousActivityReport" DROP COLUMN "report",
ADD COLUMN     "checkId" TEXT,
ADD COLUMN     "details" JSONB,
ADD COLUMN     "reportType" TEXT;

-- AlterTable
ALTER TABLE "UnderwritingAiDecisionLog" DROP COLUMN "reasoning",
ADD COLUMN     "confidence" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "UnderwritingAutomation" DROP COLUMN "result",
ADD COLUMN     "result" JSONB;

-- AlterTable
ALTER TABLE "UnderwritingCalibrationLog" DROP COLUMN "adjustments",
ADD COLUMN     "details" JSONB;

-- AlterTable
ALTER TABLE "UnderwritingChainAnalytics" DROP COLUMN "chainName",
DROP COLUMN "outcome";

-- AlterTable
ALTER TABLE "UnderwritingDecisionTree" DROP COLUMN "finalDecision",
DROP COLUMN "treeStructure",
ADD COLUMN     "tree" JSONB,
ALTER COLUMN "underwritingCaseId" SET NOT NULL;

-- AlterTable
ALTER TABLE "UnderwritingExceptionEscalation" DROP COLUMN "level",
ADD COLUMN     "escalationLevel" TEXT;

-- AlterTable
ALTER TABLE "UnderwritingProbabilisticScoring" DROP COLUMN "factors",
DROP COLUMN "probability",
ADD COLUMN     "scores" JSONB,
ALTER COLUMN "underwritingCaseId" SET NOT NULL;

-- AlterTable
ALTER TABLE "UnderwritingRuleChain" DROP COLUMN "chainName",
DROP COLUMN "result",
DROP COLUMN "steps",
ADD COLUMN     "chain" JSONB;

-- AlterTable
ALTER TABLE "UnderwritingRuleEvaluation" DROP COLUMN "details",
DROP COLUMN "ruleName",
DROP COLUMN "underwritingRuleId",
ADD COLUMN     "ruleId" TEXT,
ADD COLUMN     "score" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "UnderwritingSnapshot" DROP COLUMN "findings",
DROP COLUMN "status",
ADD COLUMN     "snapshot" JSONB;

-- DropTable
DROP TABLE "SarFlag";

-- CreateTable
CREATE TABLE "DocumentEmbedding" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentId" TEXT,
    "vector" JSONB,
    "metadata" JSONB,

    CONSTRAINT "DocumentEmbedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentSemanticScore" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentId" TEXT,
    "score" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "DocumentSemanticScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentFraudSignal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentId" TEXT NOT NULL,
    "signalType" TEXT,
    "strength" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "DocumentFraudSignal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingScoreResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "score" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingScoreResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingPipelineOutput" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "steps" JSONB,
    "finalScore" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingPipelineOutput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingRiskFactors" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingRiskFactors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnderwritingDecisionOutput" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "underwritingCaseId" TEXT,
    "decision" TEXT,
    "reasons" JSONB,
    "metadata" JSONB,

    CONSTRAINT "UnderwritingDecisionOutput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorPricingSheet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "investorId" TEXT,
    "effectiveAt" TIMESTAMP(3),
    "programName" TEXT,
    "baseRate" DOUBLE PRECISION,
    "adjustments" JSONB,
    "metadata" JSONB,

    CONSTRAINT "InvestorPricingSheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LlpaGridRow" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pricingSheetId" TEXT,
    "ltv" DOUBLE PRECISION,
    "creditScore" INTEGER,
    "llpaFactor" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "LlpaGridRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOverlay" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pricingSheetId" TEXT,
    "productType" TEXT,
    "overlayRate" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "ProductOverlay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NonQMPricingRule" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pricingSheetId" TEXT,
    "ruleName" TEXT,
    "adjustment" DOUBLE PRECISION,
    "criteria" JSONB,
    "metadata" JSONB,

    CONSTRAINT "NonQMPricingRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingScenario" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT,
    "scenarioType" TEXT,
    "inputs" JSONB,
    "outputs" JSONB,
    "metadata" JSONB,

    CONSTRAINT "PricingScenario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT,
    "finalRate" DOUBLE PRECISION,
    "components" JSONB,
    "metadata" JSONB,

    CONSTRAINT "PricingResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT,
    "score" DOUBLE PRECISION,
    "signals" JSONB,
    "metadata" JSONB,

    CONSTRAINT "FraudResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudSignalOutput" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT,
    "signalType" TEXT,
    "strength" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "FraudSignalOutput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudAnomalyOutput" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT,
    "anomalyScore" DOUBLE PRECISION,
    "details" JSONB,
    "metadata" JSONB,

    CONSTRAINT "FraudAnomalyOutput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BluetoothAlert" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "alertType" TEXT,
    "deviceId" TEXT,
    "rssi" INTEGER,
    "metadata" JSONB,

    CONSTRAINT "BluetoothAlert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BluetoothRiskEvent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "riskScore" DOUBLE PRECISION,
    "signals" JSONB,
    "metadata" JSONB,

    CONSTRAINT "BluetoothRiskEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BluetoothAnomalyResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "anomalyScore" DOUBLE PRECISION,
    "signals" JSONB,
    "metadata" JSONB,

    CONSTRAINT "BluetoothAnomalyResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerRiskScore" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "borrowerId" TEXT,
    "score" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "BorrowerRiskScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerBehaviorScore" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "borrowerId" TEXT,
    "behaviorScore" DOUBLE PRECISION,
    "patterns" JSONB,
    "metadata" JSONB,

    CONSTRAINT "BorrowerBehaviorScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerFinancialScore" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "borrowerId" TEXT,
    "financialScore" DOUBLE PRECISION,
    "metrics" JSONB,
    "metadata" JSONB,

    CONSTRAINT "BorrowerFinancialScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoringResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT,
    "fraudScore" DOUBLE PRECISION,
    "riskScore" DOUBLE PRECISION,
    "impulsivenessScore" DOUBLE PRECISION,
    "signals" JSONB,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "ScoringResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorRiskScore" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "investorId" TEXT,
    "investorSecondaryId" TEXT,
    "score" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "InvestorRiskScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorBehaviorScore" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "investorId" TEXT,
    "investorSecondaryId" TEXT,
    "behaviorScore" DOUBLE PRECISION,
    "patterns" JSONB,
    "metadata" JSONB,

    CONSTRAINT "InvestorBehaviorScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorLiquidityScore" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "investorId" TEXT,
    "investorSecondaryId" TEXT,
    "liquidityScore" DOUBLE PRECISION,
    "metrics" JSONB,
    "metadata" JSONB,

    CONSTRAINT "InvestorLiquidityScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PipelineStageResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stage" TEXT,
    "metrics" JSONB,
    "metadata" JSONB,

    CONSTRAINT "PipelineStageResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PipelineVelocityResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "velocity" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "PipelineVelocityResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CovenantBreach" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT,
    "breachType" TEXT,
    "details" JSONB,
    "metadata" JSONB,

    CONSTRAINT "CovenantBreach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CovenantStressResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT,
    "stressScore" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "CovenantStressResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StressTestScenario" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT,
    "scenarioType" TEXT,
    "parameters" JSONB,
    "metadata" JSONB,

    CONSTRAINT "StressTestScenario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StressTestResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT,
    "results" JSONB,
    "metadata" JSONB,

    CONSTRAINT "StressTestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicingEventScore" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT,
    "score" DOUBLE PRECISION,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "ServicingEventScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PipelineDeal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT,
    "investorId" TEXT,
    "name" TEXT,
    "status" TEXT,
    "metadata" JSONB,

    CONSTRAINT "PipelineDeal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnchorRecord" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT,
    "merkleRoot" TEXT,
    "txHash" TEXT,
    "anchorTxHash" TEXT,
    "metadata" JSONB,

    CONSTRAINT "AnchorRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreRecord" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "applicationId" TEXT,
    "fraudScore" DOUBLE PRECISION,
    "riskScore" DOUBLE PRECISION,
    "impulsivenessScore" DOUBLE PRECISION,
    "signals" JSONB,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "ScoreRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRiskScore" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "fraudScore" DOUBLE PRECISION,
    "riskScore" DOUBLE PRECISION,
    "impulsivenessScore" DOUBLE PRECISION,
    "signals" JSONB,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "UserRiskScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadScoringResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "leadId" TEXT,
    "userId" INTEGER,
    "fraudScore" DOUBLE PRECISION,
    "riskScore" DOUBLE PRECISION,
    "impulsivenessScore" DOUBLE PRECISION,
    "signals" JSONB,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "LeadScoringResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRiskSignal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "signalType" TEXT,
    "strength" DOUBLE PRECISION,
    "fraudScore" DOUBLE PRECISION,
    "riskScore" DOUBLE PRECISION,
    "impulsivenessScore" DOUBLE PRECISION,
    "signals" JSONB,
    "factors" JSONB,
    "metadata" JSONB,

    CONSTRAINT "UserRiskSignal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicingRiskSignal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT,
    "signalType" TEXT,
    "strength" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "ServicingRiskSignal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentEmbedding_id_key" ON "DocumentEmbedding"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorPricingSheet_investorId_key" ON "InvestorPricingSheet"("investorId");

-- CreateIndex
CREATE UNIQUE INDEX "PricingScenario_applicationId_key" ON "PricingScenario"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "PricingResult_applicationId_key" ON "PricingResult"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudResult_applicationId_key" ON "FraudResult"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudSignalOutput_applicationId_key" ON "FraudSignalOutput"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "FraudAnomalyOutput_applicationId_key" ON "FraudAnomalyOutput"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowerRiskScore_borrowerId_key" ON "BorrowerRiskScore"("borrowerId");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowerBehaviorScore_borrowerId_key" ON "BorrowerBehaviorScore"("borrowerId");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowerFinancialScore_borrowerId_key" ON "BorrowerFinancialScore"("borrowerId");

-- CreateIndex
CREATE UNIQUE INDEX "ScoringResult_applicationId_key" ON "ScoringResult"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorRiskScore_investorId_key" ON "InvestorRiskScore"("investorId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorRiskScore_investorSecondaryId_key" ON "InvestorRiskScore"("investorSecondaryId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorBehaviorScore_investorId_key" ON "InvestorBehaviorScore"("investorId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorBehaviorScore_investorSecondaryId_key" ON "InvestorBehaviorScore"("investorSecondaryId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorLiquidityScore_investorId_key" ON "InvestorLiquidityScore"("investorId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorLiquidityScore_investorSecondaryId_key" ON "InvestorLiquidityScore"("investorSecondaryId");

-- CreateIndex
CREATE UNIQUE INDEX "CovenantBreach_applicationId_key" ON "CovenantBreach"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "CovenantStressResult_applicationId_key" ON "CovenantStressResult"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "StressTestScenario_applicationId_key" ON "StressTestScenario"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "StressTestResult_applicationId_key" ON "StressTestResult"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "ServicingEventScore_applicationId_key" ON "ServicingEventScore"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "PipelineDeal_applicationId_key" ON "PipelineDeal"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "AnchorRecord_applicationId_key" ON "AnchorRecord"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "ScoreRecord_userId_key" ON "ScoreRecord"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRiskScore_userId_key" ON "UserRiskScore"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LeadScoringResult_userId_key" ON "LeadScoringResult"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRiskSignal_userId_key" ON "UserRiskSignal"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ServicingRiskSignal_applicationId_key" ON "ServicingRiskSignal"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationAiScoring_applicationId_key" ON "ApplicationAiScoring"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationComplianceLadder_applicationId_key" ON "ApplicationComplianceLadder"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationComplianceSignalChain_applicationId_key" ON "ApplicationComplianceSignalChain"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationDocumentCompleteness_applicationId_key" ON "ApplicationDocumentCompleteness"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationFraudRiskLadder_applicationId_key" ON "ApplicationFraudRiskLadder"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationFraudSignalChain_applicationId_key" ON "ApplicationFraudSignalChain"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationRiskLadder_applicationId_key" ON "ApplicationRiskLadder"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationScoringPipeline_applicationId_key" ON "ApplicationScoringPipeline"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationWorkflowAiLayer_applicationId_key" ON "ApplicationWorkflowAiLayer"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Borrower_userId_key" ON "Borrower"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowerBehavioralDrift_borrowerId_key" ON "BorrowerBehavioralDrift"("borrowerId");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowerBehavioralRiskLayer_borrowerId_key" ON "BorrowerBehavioralRiskLayer"("borrowerId");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowerFinancialDrift_borrowerId_key" ON "BorrowerFinancialDrift"("borrowerId");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowerFinancialStability_borrowerId_key" ON "BorrowerFinancialStability"("borrowerId");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowerHardshipAnalytics_borrowerId_key" ON "BorrowerHardshipAnalytics"("borrowerId");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowerMacroRiskExposure_borrowerId_key" ON "BorrowerMacroRiskExposure"("borrowerId");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowerRepaymentResilience_borrowerId_key" ON "BorrowerRepaymentResilience"("borrowerId");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowerRetentionAnalytics_borrowerId_key" ON "BorrowerRetentionAnalytics"("borrowerId");

-- CreateIndex
CREATE UNIQUE INDEX "Check_anchorRecordId_key" ON "Check"("anchorRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_structuralAnalysisId_key" ON "Document"("structuralAnalysisId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_extractionPipelineId_key" ON "Document"("extractionPipelineId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_structuralLegacyId_key" ON "Document"("structuralLegacyId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentExtractionPipeline_documentSingleId_key" ON "DocumentExtractionPipeline"("documentSingleId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentStructuralAnalysis_documentMainId_key" ON "DocumentStructuralAnalysis"("documentMainId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentStructuralAnalysis_documentLegacyId_key" ON "DocumentStructuralAnalysis"("documentLegacyId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorScoringResult_userId_key" ON "InvestorScoringResult"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingCase_id_key" ON "UnderwritingCase"("id");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentLineage" ADD CONSTRAINT "DocumentLineage_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentStructuralAnalysis" ADD CONSTRAINT "DocumentStructuralAnalysis_documentMainId_fkey" FOREIGN KEY ("documentMainId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentStructuralAnalysis" ADD CONSTRAINT "DocumentStructuralAnalysis_documentLegacyId_fkey" FOREIGN KEY ("documentLegacyId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentExtractionPipeline" ADD CONSTRAINT "DocumentExtractionPipeline_documentSingleId_fkey" FOREIGN KEY ("documentSingleId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentExtractionPipeline" ADD CONSTRAINT "DocumentExtractionPipeline_parentDocumentId_fkey" FOREIGN KEY ("parentDocumentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentEmbedding" ADD CONSTRAINT "DocumentEmbedding_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentSemanticScore" ADD CONSTRAINT "DocumentSemanticScore_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentFraudSignal" ADD CONSTRAINT "DocumentFraudSignal_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisclosureLifecycleAnalytics" ADD CONSTRAINT "DisclosureLifecycleAnalytics_disclosureId_fkey" FOREIGN KEY ("disclosureId") REFERENCES "Disclosure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisclosureComplianceLayer" ADD CONSTRAINT "DisclosureComplianceLayer_disclosureId_fkey" FOREIGN KEY ("disclosureId") REFERENCES "Disclosure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisclosureBehaviorAnalytics" ADD CONSTRAINT "DisclosureBehaviorAnalytics_disclosureId_fkey" FOREIGN KEY ("disclosureId") REFERENCES "Disclosure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisclosureBehaviorTrajectory" ADD CONSTRAINT "DisclosureBehaviorTrajectory_disclosureId_fkey" FOREIGN KEY ("disclosureId") REFERENCES "Disclosure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisclosureSentimentAnalytics" ADD CONSTRAINT "DisclosureSentimentAnalytics_disclosureId_fkey" FOREIGN KEY ("disclosureId") REFERENCES "Disclosure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisclosureEngagementAnalytics" ADD CONSTRAINT "DisclosureEngagementAnalytics_disclosureId_fkey" FOREIGN KEY ("disclosureId") REFERENCES "Disclosure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingRuleEvaluation" ADD CONSTRAINT "UnderwritingRuleEvaluation_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "UnderwritingRule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingProbabilisticScoring" ADD CONSTRAINT "UnderwritingProbabilisticScoring_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingDecisionTree" ADD CONSTRAINT "UnderwritingDecisionTree_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingScoreResult" ADD CONSTRAINT "UnderwritingScoreResult_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingPipelineOutput" ADD CONSTRAINT "UnderwritingPipelineOutput_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingRiskFactors" ADD CONSTRAINT "UnderwritingRiskFactors_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnderwritingDecisionOutput" ADD CONSTRAINT "UnderwritingDecisionOutput_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorPricingSheet" ADD CONSTRAINT "InvestorPricingSheet_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LlpaGridRow" ADD CONSTRAINT "LlpaGridRow_pricingSheetId_fkey" FOREIGN KEY ("pricingSheetId") REFERENCES "InvestorPricingSheet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOverlay" ADD CONSTRAINT "ProductOverlay_pricingSheetId_fkey" FOREIGN KEY ("pricingSheetId") REFERENCES "InvestorPricingSheet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NonQMPricingRule" ADD CONSTRAINT "NonQMPricingRule_pricingSheetId_fkey" FOREIGN KEY ("pricingSheetId") REFERENCES "InvestorPricingSheet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingScenario" ADD CONSTRAINT "PricingScenario_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingResult" ADD CONSTRAINT "PricingResult_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudFlag" ADD CONSTRAINT "FraudFlag_checkId_fkey" FOREIGN KEY ("checkId") REFERENCES "Check"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuspiciousActivityReport" ADD CONSTRAINT "SuspiciousActivityReport_checkId_fkey" FOREIGN KEY ("checkId") REFERENCES "Check"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudEvent" ADD CONSTRAINT "FraudEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudResult" ADD CONSTRAINT "FraudResult_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudSignalOutput" ADD CONSTRAINT "FraudSignalOutput_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudAnomalyOutput" ADD CONSTRAINT "FraudAnomalyOutput_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BluetoothAlert" ADD CONSTRAINT "BluetoothAlert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BluetoothRiskEvent" ADD CONSTRAINT "BluetoothRiskEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerRiskScore" ADD CONSTRAINT "BorrowerRiskScore_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerBehaviorScore" ADD CONSTRAINT "BorrowerBehaviorScore_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerFinancialScore" ADD CONSTRAINT "BorrowerFinancialScore_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoringResult" ADD CONSTRAINT "ScoringResult_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorRiskScore" ADD CONSTRAINT "InvestorRiskScore_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorRiskScore" ADD CONSTRAINT "InvestorRiskScore_investorSecondaryId_fkey" FOREIGN KEY ("investorSecondaryId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorBehaviorScore" ADD CONSTRAINT "InvestorBehaviorScore_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorBehaviorScore" ADD CONSTRAINT "InvestorBehaviorScore_investorSecondaryId_fkey" FOREIGN KEY ("investorSecondaryId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorLiquidityScore" ADD CONSTRAINT "InvestorLiquidityScore_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorLiquidityScore" ADD CONSTRAINT "InvestorLiquidityScore_investorSecondaryId_fkey" FOREIGN KEY ("investorSecondaryId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CovenantBreach" ADD CONSTRAINT "CovenantBreach_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CovenantStressResult" ADD CONSTRAINT "CovenantStressResult_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StressTestScenario" ADD CONSTRAINT "StressTestScenario_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StressTestResult" ADD CONSTRAINT "StressTestResult_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicingEventScore" ADD CONSTRAINT "ServicingEventScore_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Check" ADD CONSTRAINT "Check_anchorRecordId_fkey" FOREIGN KEY ("anchorRecordId") REFERENCES "AnchorRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanAmortization" ADD CONSTRAINT "LoanAmortization_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanPayoff" ADD CONSTRAINT "LoanPayoff_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanDelinquency" ADD CONSTRAINT "LoanDelinquency_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineDeal" ADD CONSTRAINT "PipelineDeal_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineDeal" ADD CONSTRAINT "PipelineDeal_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnchorRecord" ADD CONSTRAINT "AnchorRecord_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreRecord" ADD CONSTRAINT "ScoreRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreRecord" ADD CONSTRAINT "ScoreRecord_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRiskScore" ADD CONSTRAINT "UserRiskScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadScoringResult" ADD CONSTRAINT "LeadScoringResult_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadScoringResult" ADD CONSTRAINT "LeadScoringResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRiskSignal" ADD CONSTRAINT "UserRiskSignal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorScoringResult" ADD CONSTRAINT "InvestorScoringResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicingRiskSignal" ADD CONSTRAINT "ServicingRiskSignal_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;
