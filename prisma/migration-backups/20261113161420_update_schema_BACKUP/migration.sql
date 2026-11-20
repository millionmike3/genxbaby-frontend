/*
  Warnings:

  - The values [DISABLED] on the enum `UserStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[refreshTokenHash]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationId` to the `PricingAuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LeadCategory" AS ENUM ('BUYER', 'SELLER', 'REFINANCE', 'INVESTOR', 'BROKER_REFERRAL', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "LeadOpportunityStatus" AS ENUM ('NEW', 'QUALIFYING', 'QUALIFIED', 'ASSIGNED', 'CONTACTED', 'ENGAGED', 'APPLICATION_STARTED', 'CONVERTED', 'DISQUALIFIED', 'CLOSED');

-- CreateEnum
CREATE TYPE "AgentRunStatus" AS ENUM ('QUEUED', 'RUNNING', 'WAITING_FOR_APPROVAL', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AgentTaskStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'WAITING', 'COMPLETED', 'FAILED', 'CANCELLED');


-- AlterEnum
BEGIN;

CREATE TYPE "UserStatus_new" AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'SUSPENDED',
    'PENDING',
    'DEACTIVATED'
);

ALTER TYPE "UserStatus" RENAME TO "UserStatus_old";

ALTER TYPE "UserStatus_new" RENAME TO "UserStatus";

DROP TYPE "UserStatus_old";

COMMIT;

-- DropIndex
DROP INDEX "PricingEngineAudit_applicationId_key";

-- DropIndex
DROP INDEX "PricingEngineInferenceLog_applicationId_key";

-- DropIndex
DROP INDEX "PricingResult_applicationId_key";

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "assignedToUserId" INTEGER,
ADD COLUMN     "category" "LeadCategory" NOT NULL DEFAULT 'UNKNOWN',
ADD COLUMN     "consentCapturedAt" TIMESTAMP(3),
ADD COLUMN     "consentSource" TEXT,
ADD COLUMN     "consentStatus" TEXT,
ADD COLUMN     "duplicateFingerprint" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "source" TEXT,
ADD COLUMN     "status" "LeadOpportunityStatus" NOT NULL DEFAULT 'NEW',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PricingAuditLog" ADD COLUMN     "applicationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "deviceName" TEXT,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "refreshTokenHash" TEXT,
ADD COLUMN     "revokedAt" TIMESTAMP(3),
ADD COLUMN     "tokenFamily" TEXT,
ADD COLUMN     "userAgent" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerifiedAt" TIMESTAMP(3),
ADD COLUMN     "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ADD COLUMN     "lockedUntil" TIMESTAMP(3),
ADD COLUMN     "mfaEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "passwordChangedAt" TIMESTAMP(3),
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE "PricingMatrix" (
    "id" TEXT NOT NULL,
    "loan_id" TEXT NOT NULL,
    "product_type" TEXT NOT NULL,
    "property_type" TEXT NOT NULL,
    "lending_type" TEXT NOT NULL,
    "credit_tier" TEXT NOT NULL,
    "base_rate" DOUBLE PRECISION NOT NULL,
    "macro_adj_bps" INTEGER NOT NULL,
    "bank_adj_bps" INTEGER NOT NULL,
    "property_adj_bps" INTEGER NOT NULL,
    "credit_adj_bps" INTEGER NOT NULL,
    "lending_type_adj_bps" INTEGER NOT NULL,
    "margin_bps" INTEGER NOT NULL,
    "final_rate" DOUBLE PRECISION NOT NULL,
    "payment" INTEGER NOT NULL,
    "loan_amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "PricingMatrix_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RateLock" (
    "id" TEXT NOT NULL,
    "loan_id" TEXT NOT NULL,
    "locked_rate" DOUBLE PRECISION NOT NULL,
    "locked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "RateLock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorRateSheetSnapshot" (
    "id" TEXT NOT NULL,
    "investor" TEXT NOT NULL,
    "product_type" TEXT NOT NULL,
    "buy_price_bps" INTEGER NOT NULL,
    "sell_price_bps" INTEGER NOT NULL,
    "execution_adj_bps" INTEGER NOT NULL,
    "overlay_adj_bps" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvestorRateSheetSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanRiskSnapshot" (
    "id" TEXT NOT NULL,
    "loan_id" TEXT NOT NULL,
    "fraud_risk_tier" TEXT NOT NULL,
    "fraud_score" INTEGER NOT NULL,
    "health_tier" TEXT NOT NULL,
    "health_score" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "LoanRiskSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExecutionSnapshot" (
    "id" TEXT NOT NULL,
    "investor" TEXT NOT NULL,
    "execution_bps" INTEGER NOT NULL,
    "pnl_dollars" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExecutionSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanBehaviorSnapshot" (
    "id" TEXT NOT NULL,
    "loan_id" TEXT NOT NULL,
    "behavior_tier" TEXT NOT NULL,
    "behavior_score" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "LoanBehaviorSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketSnapshot" (
    "id" TEXT NOT NULL,
    "mbs_current_coupon" DOUBLE PRECISION NOT NULL,
    "treasury_10y" DOUBLE PRECISION NOT NULL,
    "treasury_2y" DOUBLE PRECISION NOT NULL,
    "inflation_yoy" DOUBLE PRECISION NOT NULL,
    "volatility_index" DOUBLE PRECISION NOT NULL,
    "gdp_growth" DOUBLE PRECISION NOT NULL,
    "unemployment_rate" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarketSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingConfig" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value_json" JSONB NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankRateSnapshot" (
    "id" TEXT NOT NULL,
    "product_type" TEXT NOT NULL,
    "bank_rate" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BankRateSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentDefinition" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "version" TEXT NOT NULL DEFAULT '1.0.0',
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "config" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgentDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentRun" (
    "id" TEXT NOT NULL,
    "agentDefinitionId" TEXT NOT NULL,
    "createdByUserId" INTEGER,
    "applicationId" TEXT,
    "underwritingCaseId" TEXT,
    "leadId" TEXT,
    "investorId" TEXT,
    "servicingRecordId" TEXT,
    "status" "AgentRunStatus" NOT NULL DEFAULT 'QUEUED',
    "trigger" TEXT NOT NULL,
    "input" JSONB,
    "output" JSONB,
    "error" TEXT,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgentRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentTask" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "assignedToUserId" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "AgentTaskStatus" NOT NULL DEFAULT 'OPEN',
    "priority" INTEGER NOT NULL DEFAULT 3,
    "payload" JSONB,
    "dueAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgentTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentApproval" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "approverUserId" INTEGER,
    "decision" TEXT NOT NULL DEFAULT 'PENDING',
    "reason" TEXT,
    "decidedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgentApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentToolCall" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "toolName" TEXT NOT NULL,
    "input" JSONB,
    "output" JSONB,
    "status" TEXT NOT NULL,
    "error" TEXT,
    "durationMs" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgentToolCall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutreachCampaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutreachCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutreachMessage" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "campaignId" TEXT,
    "channel" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'QUEUED',
    "body" TEXT,
    "provider" TEXT,
    "providerMessageId" TEXT,
    "sentAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OutreachMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadConsent" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "consentGiven" BOOLEAN NOT NULL DEFAULT false,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT,
    "disclosureVersion" TEXT,
    "ipAddress" TEXT,
    "revokedAt" TIMESTAMP(3),
    "evidence" JSONB,

    CONSTRAINT "LeadConsent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyListing" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "propertyType" TEXT,
    "listingStatus" TEXT,
    "listPrice" INTEGER,
    "bedrooms" DOUBLE PRECISION,
    "bathrooms" DOUBLE PRECISION,
    "squareFeet" INTEGER,
    "listedAt" TIMESTAMP(3),
    "sourceUrl" TEXT,
    "rawData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrokerProfile" (
    "id" TEXT NOT NULL,
    "userId" INTEGER,
    "companyName" TEXT,
    "licenseNumber" TEXT,
    "markets" JSONB,
    "specialties" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BrokerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadOpportunity" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "propertyListingId" TEXT,
    "assignedToUserId" INTEGER,
    "category" "LeadCategory" NOT NULL,
    "status" "LeadOpportunityStatus" NOT NULL DEFAULT 'NEW',
    "score" DOUBLE PRECISION,
    "scoreBreakdown" JSONB,
    "estimatedLoanNeed" INTEGER,
    "nextActionAt" TIMESTAMP(3),
    "assignedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeadOpportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadAssignment" (
    "id" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "assignedToUserId" INTEGER NOT NULL,
    "assignedByUserId" INTEGER,
    "reason" TEXT,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "releasedAt" TIMESTAMP(3),

    CONSTRAINT "LeadAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRoleAssignment" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "UserRole" NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRoleAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthToken" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthAuditEvent" (
    "id" TEXT NOT NULL,
    "userId" INTEGER,
    "email" TEXT,
    "eventType" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthAuditEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthFactor" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "factorType" TEXT NOT NULL,
    "secretEncrypted" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthFactor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PricingConfig_key_key" ON "PricingConfig"("key");

-- CreateIndex
CREATE UNIQUE INDEX "AgentDefinition_key_key" ON "AgentDefinition"("key");

-- CreateIndex
CREATE INDEX "AgentRun_agentDefinitionId_status_idx" ON "AgentRun"("agentDefinitionId", "status");

-- CreateIndex
CREATE INDEX "AgentRun_applicationId_idx" ON "AgentRun"("applicationId");

-- CreateIndex
CREATE INDEX "AgentRun_leadId_idx" ON "AgentRun"("leadId");

-- CreateIndex
CREATE INDEX "AgentRun_createdAt_idx" ON "AgentRun"("createdAt");

-- CreateIndex
CREATE INDEX "AgentTask_assignedToUserId_status_idx" ON "AgentTask"("assignedToUserId", "status");

-- CreateIndex
CREATE INDEX "AgentTask_runId_status_idx" ON "AgentTask"("runId", "status");

-- CreateIndex
CREATE INDEX "AgentApproval_runId_decision_idx" ON "AgentApproval"("runId", "decision");

-- CreateIndex
CREATE INDEX "AgentToolCall_runId_createdAt_idx" ON "AgentToolCall"("runId", "createdAt");

-- CreateIndex
CREATE INDEX "OutreachMessage_leadId_createdAt_idx" ON "OutreachMessage"("leadId", "createdAt");

-- CreateIndex
CREATE INDEX "OutreachMessage_campaignId_status_idx" ON "OutreachMessage"("campaignId", "status");

-- CreateIndex
CREATE INDEX "LeadConsent_leadId_channel_purpose_idx" ON "LeadConsent"("leadId", "channel", "purpose");

-- CreateIndex
CREATE INDEX "PropertyListing_state_city_zip_idx" ON "PropertyListing"("state", "city", "zip");

-- CreateIndex
CREATE INDEX "PropertyListing_listingStatus_listPrice_idx" ON "PropertyListing"("listingStatus", "listPrice");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyListing_source_externalId_key" ON "PropertyListing"("source", "externalId");

-- CreateIndex
CREATE UNIQUE INDEX "BrokerProfile_userId_key" ON "BrokerProfile"("userId");

-- CreateIndex
CREATE INDEX "LeadOpportunity_status_score_idx" ON "LeadOpportunity"("status", "score");

-- CreateIndex
CREATE INDEX "LeadOpportunity_assignedToUserId_status_idx" ON "LeadOpportunity"("assignedToUserId", "status");

-- CreateIndex
CREATE INDEX "LeadOpportunity_category_status_idx" ON "LeadOpportunity"("category", "status");

-- CreateIndex
CREATE INDEX "LeadAssignment_opportunityId_assignedAt_idx" ON "LeadAssignment"("opportunityId", "assignedAt");

-- CreateIndex
CREATE INDEX "LeadAssignment_assignedToUserId_releasedAt_idx" ON "LeadAssignment"("assignedToUserId", "releasedAt");

-- CreateIndex
CREATE INDEX "UserRoleAssignment_role_idx" ON "UserRoleAssignment"("role");

-- CreateIndex
CREATE UNIQUE INDEX "UserRoleAssignment_userId_role_key" ON "UserRoleAssignment"("userId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "AuthToken_tokenHash_key" ON "AuthToken"("tokenHash");

-- CreateIndex
CREATE INDEX "AuthToken_userId_type_idx" ON "AuthToken"("userId", "type");

-- CreateIndex
CREATE INDEX "AuthToken_expiresAt_idx" ON "AuthToken"("expiresAt");

-- CreateIndex
CREATE INDEX "AuthAuditEvent_userId_createdAt_idx" ON "AuthAuditEvent"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "AuthAuditEvent_eventType_createdAt_idx" ON "AuthAuditEvent"("eventType", "createdAt");

-- CreateIndex
CREATE INDEX "AuthFactor_userId_idx" ON "AuthFactor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_refreshTokenHash_key" ON "Session"("refreshTokenHash");

-- AddForeignKey
ALTER TABLE "PricingMatrix" ADD CONSTRAINT "PricingMatrix_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RateLock" ADD CONSTRAINT "RateLock_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanRiskSnapshot" ADD CONSTRAINT "LoanRiskSnapshot_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanBehaviorSnapshot" ADD CONSTRAINT "LoanBehaviorSnapshot_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingConfig" ADD CONSTRAINT "PricingConfig_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentRun" ADD CONSTRAINT "AgentRun_agentDefinitionId_fkey" FOREIGN KEY ("agentDefinitionId") REFERENCES "AgentDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentRun" ADD CONSTRAINT "AgentRun_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentRun" ADD CONSTRAINT "AgentRun_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentRun" ADD CONSTRAINT "AgentRun_underwritingCaseId_fkey" FOREIGN KEY ("underwritingCaseId") REFERENCES "UnderwritingCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentRun" ADD CONSTRAINT "AgentRun_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentRun" ADD CONSTRAINT "AgentRun_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentRun" ADD CONSTRAINT "AgentRun_servicingRecordId_fkey" FOREIGN KEY ("servicingRecordId") REFERENCES "ServicingRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentTask" ADD CONSTRAINT "AgentTask_runId_fkey" FOREIGN KEY ("runId") REFERENCES "AgentRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentTask" ADD CONSTRAINT "AgentTask_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentApproval" ADD CONSTRAINT "AgentApproval_runId_fkey" FOREIGN KEY ("runId") REFERENCES "AgentRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentApproval" ADD CONSTRAINT "AgentApproval_approverUserId_fkey" FOREIGN KEY ("approverUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentToolCall" ADD CONSTRAINT "AgentToolCall_runId_fkey" FOREIGN KEY ("runId") REFERENCES "AgentRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutreachMessage" ADD CONSTRAINT "OutreachMessage_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutreachMessage" ADD CONSTRAINT "OutreachMessage_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "OutreachCampaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadConsent" ADD CONSTRAINT "LeadConsent_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrokerProfile" ADD CONSTRAINT "BrokerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadOpportunity" ADD CONSTRAINT "LeadOpportunity_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadOpportunity" ADD CONSTRAINT "LeadOpportunity_propertyListingId_fkey" FOREIGN KEY ("propertyListingId") REFERENCES "PropertyListing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadOpportunity" ADD CONSTRAINT "LeadOpportunity_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadAssignment" ADD CONSTRAINT "LeadAssignment_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "LeadOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadAssignment" ADD CONSTRAINT "LeadAssignment_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadAssignment" ADD CONSTRAINT "LeadAssignment_assignedByUserId_fkey" FOREIGN KEY ("assignedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoleAssignment" ADD CONSTRAINT "UserRoleAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthToken" ADD CONSTRAINT "AuthToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthAuditEvent" ADD CONSTRAINT "AuthAuditEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthFactor" ADD CONSTRAINT "AuthFactor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
