/*
  Warnings:

  - A unique constraint covering the columns `[applicationId]` on the table `UnderwritingPipelineOutput` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `applicationId` to the `UnderwritingPipelineOutput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `milestone` to the `UnderwritingPipelineOutput` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "loanOfficerId" TEXT,
ADD COLUMN     "milestone" TEXT NOT NULL DEFAULT 'Application Submitted',
ADD COLUMN     "underwritingPipelineOutputId" TEXT;

-- AlterTable
ALTER TABLE "BorrowerDocument" ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "UnderwritingPipelineOutput" ADD COLUMN     "applicationId" TEXT NOT NULL,
ADD COLUMN     "docsPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "docsRequired" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "docsSatisfied" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "milestone" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "DocumentRequirement" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    "reason" TEXT,
    "satisfied" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanOfficer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoanOfficer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoanOfficer_email_key" ON "LoanOfficer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UnderwritingPipelineOutput_applicationId_key" ON "UnderwritingPipelineOutput"("applicationId");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_loanOfficerId_fkey" FOREIGN KEY ("loanOfficerId") REFERENCES "LoanOfficer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_underwritingPipelineOutputId_fkey" FOREIGN KEY ("underwritingPipelineOutputId") REFERENCES "UnderwritingPipelineOutput"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentRequirement" ADD CONSTRAINT "DocumentRequirement_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
