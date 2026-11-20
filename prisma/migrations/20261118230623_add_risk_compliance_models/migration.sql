/*
  Warnings:

  - You are about to drop the column `jobTitle` on the `BorrowerEmployment` table. All the data in the column will be lost.
  - You are about to drop the column `yearsInProfession` on the `BorrowerEmployment` table. All the data in the column will be lost.
  - Added the required column `employmentStatus` to the `BorrowerEmployment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentType` to the `BorrowerEmployment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmploymentStatus" AS ENUM ('CURRENT', 'FORMER', 'LEAVE_OF_ABSENCE', 'TERMINATED');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'REQUESTED', 'VERIFIED', 'FAILED');

-- CreateEnum
CREATE TYPE "OriginationStage" AS ENUM ('LEAD', 'PROSPECT', 'PRE_QUALIFIED', 'APPLICATION_STARTED', 'APPLICATION_COMPLETED', 'PROCESSING', 'UNDERWRITING', 'CONDITIONAL_APPROVAL', 'CLEAR_TO_CLOSE', 'FUNDED', 'SERVICING');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('W2', 'SELF_EMPLOYED', 'CONTRACTOR', 'GIG_WORKER', 'MILITARY', 'RETIRED', 'UNEMPLOYED');

-- CreateEnum
CREATE TYPE "EmploymentDocumentType" AS ENUM ('PAYSTUB', 'W2', 'W2_TRANSCRIPT', 'TAX_RETURN', 'VOE', 'YEARTODATE_EARNINGS', 'EMPLOYMENT_CONTRACT', 'PROFIT_AND_LOSS', 'BANK_STATEMENT');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "stage" "OriginationStage" NOT NULL DEFAULT 'LEAD';

-- AlterTable
ALTER TABLE "BorrowerEmployment" DROP COLUMN "jobTitle",
DROP COLUMN "yearsInProfession",
ADD COLUMN     "annualIncome" DECIMAL(12,2),
ADD COLUMN     "baseIncome" DECIMAL(12,2),
ADD COLUMN     "bonusIncome" DECIMAL(12,2),
ADD COLUMN     "commissionIncome" DECIMAL(12,2),
ADD COLUMN     "employerAddress1" TEXT,
ADD COLUMN     "employerAddress2" TEXT,
ADD COLUMN     "employerCity" TEXT,
ADD COLUMN     "employerEmail" TEXT,
ADD COLUMN     "employerPhone" TEXT,
ADD COLUMN     "employerState" TEXT,
ADD COLUMN     "employerZip" TEXT,
ADD COLUMN     "employmentStatus" "EmploymentStatus" NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "isPrimaryEmployment" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "monthlyIncome" DECIMAL(12,2),
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "otherIncome" DECIMAL(12,2),
ADD COLUMN     "overtimeIncome" DECIMAL(12,2),
ADD COLUMN     "ownershipPercent" DECIMAL(5,2),
ADD COLUMN     "selfEmployed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "voeCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "voeOrdered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "workNumberId" TEXT,
ADD COLUMN     "workNumberVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "yearsInIndustry" DECIMAL(5,2),
DROP COLUMN "employmentType",
ADD COLUMN     "employmentType" "EmploymentType" NOT NULL;

-- CreateTable
CREATE TABLE "borrower_employment_documents" (
    "id" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employmentId" TEXT NOT NULL,
    "documentType" "EmploymentDocumentType" NOT NULL,
    "documentId" TEXT,

    CONSTRAINT "borrower_employment_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationNote" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApplicationNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerCondition" (
    "id" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "applicationId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "priority" TEXT DEFAULT 'MEDIUM',
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "assignedRole" "UserRole",
    "dueDate" TIMESTAMP(3),
    "satisfiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BorrowerCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerDisclosure" (
    "id" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "applicationId" TEXT,
    "disclosureType" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "acceptedAt" TIMESTAMP(3),
    "version" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BorrowerDisclosure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerMilestone" (
    "id" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "applicationId" TEXT,
    "stage" "OriginationStage" NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "notes" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BorrowerMilestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerTimeline" (
    "id" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "applicationId" TEXT,
    "eventType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "actorRole" "UserRole",
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BorrowerTimeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerMessage" (
    "id" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "applicationId" TEXT,
    "senderType" TEXT NOT NULL,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BorrowerMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowerAgentAssignment" (
    "id" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "applicationId" TEXT,
    "agentKey" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BorrowerAgentAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "borrower_employment_documents_employmentId_idx" ON "borrower_employment_documents"("employmentId");

-- CreateIndex
CREATE INDEX "borrower_employment_documents_documentId_idx" ON "borrower_employment_documents"("documentId");

-- CreateIndex
CREATE INDEX "ApplicationNote_applicationId_createdAt_idx" ON "ApplicationNote"("applicationId", "createdAt");

-- CreateIndex
CREATE INDEX "BorrowerCondition_borrowerId_idx" ON "BorrowerCondition"("borrowerId");

-- CreateIndex
CREATE INDEX "BorrowerCondition_applicationId_idx" ON "BorrowerCondition"("applicationId");

-- CreateIndex
CREATE INDEX "BorrowerDisclosure_borrowerId_idx" ON "BorrowerDisclosure"("borrowerId");

-- CreateIndex
CREATE INDEX "BorrowerMilestone_borrowerId_idx" ON "BorrowerMilestone"("borrowerId");

-- CreateIndex
CREATE INDEX "BorrowerTimeline_borrowerId_idx" ON "BorrowerTimeline"("borrowerId");

-- CreateIndex
CREATE INDEX "BorrowerTimeline_applicationId_idx" ON "BorrowerTimeline"("applicationId");

-- CreateIndex
CREATE INDEX "BorrowerMessage_borrowerId_idx" ON "BorrowerMessage"("borrowerId");

-- CreateIndex
CREATE INDEX "BorrowerAgentAssignment_borrowerId_idx" ON "BorrowerAgentAssignment"("borrowerId");

-- CreateIndex
CREATE INDEX "BorrowerEmployment_borrowerId_idx" ON "BorrowerEmployment"("borrowerId");

-- CreateIndex
CREATE INDEX "BorrowerEmployment_verificationStatus_idx" ON "BorrowerEmployment"("verificationStatus");

-- CreateIndex
CREATE INDEX "BorrowerEmployment_employmentStatus_idx" ON "BorrowerEmployment"("employmentStatus");

-- AddForeignKey
ALTER TABLE "borrower_employment_documents" ADD CONSTRAINT "borrower_employment_documents_employmentId_fkey" FOREIGN KEY ("employmentId") REFERENCES "BorrowerEmployment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrower_employment_documents" ADD CONSTRAINT "borrower_employment_documents_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationNote" ADD CONSTRAINT "ApplicationNote_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerCondition" ADD CONSTRAINT "BorrowerCondition_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerCondition" ADD CONSTRAINT "BorrowerCondition_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerDisclosure" ADD CONSTRAINT "BorrowerDisclosure_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerDisclosure" ADD CONSTRAINT "BorrowerDisclosure_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerMilestone" ADD CONSTRAINT "BorrowerMilestone_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerMilestone" ADD CONSTRAINT "BorrowerMilestone_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerTimeline" ADD CONSTRAINT "BorrowerTimeline_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerTimeline" ADD CONSTRAINT "BorrowerTimeline_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerMessage" ADD CONSTRAINT "BorrowerMessage_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerMessage" ADD CONSTRAINT "BorrowerMessage_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerAgentAssignment" ADD CONSTRAINT "BorrowerAgentAssignment_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerAgentAssignment" ADD CONSTRAINT "BorrowerAgentAssignment_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;
