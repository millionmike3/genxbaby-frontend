/*
  Warnings:

  - Added the required column `updatedAt` to the `BorrowerAgentAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BorrowerDisclosure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BorrowerMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BorrowerMilestone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BorrowerTimeline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BorrowerAgentAssignment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "unassignedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BorrowerCondition" ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "BorrowerDisclosure" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BorrowerMessage" ADD COLUMN     "readAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BorrowerMilestone" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BorrowerTimeline" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "BorrowerAgentAssignment_applicationId_idx" ON "BorrowerAgentAssignment"("applicationId");

-- CreateIndex
CREATE INDEX "BorrowerAgentAssignment_agentKey_idx" ON "BorrowerAgentAssignment"("agentKey");

-- CreateIndex
CREATE INDEX "BorrowerAgentAssignment_active_idx" ON "BorrowerAgentAssignment"("active");

-- CreateIndex
CREATE INDEX "BorrowerCondition_status_idx" ON "BorrowerCondition"("status");

-- CreateIndex
CREATE INDEX "BorrowerDisclosure_applicationId_idx" ON "BorrowerDisclosure"("applicationId");

-- CreateIndex
CREATE INDEX "BorrowerDisclosure_accepted_idx" ON "BorrowerDisclosure"("accepted");

-- CreateIndex
CREATE INDEX "BorrowerMessage_applicationId_idx" ON "BorrowerMessage"("applicationId");

-- CreateIndex
CREATE INDEX "BorrowerMessage_read_idx" ON "BorrowerMessage"("read");

-- CreateIndex
CREATE INDEX "BorrowerMilestone_applicationId_idx" ON "BorrowerMilestone"("applicationId");

-- CreateIndex
CREATE INDEX "BorrowerMilestone_stage_idx" ON "BorrowerMilestone"("stage");

-- CreateIndex
CREATE INDEX "BorrowerTimeline_eventType_idx" ON "BorrowerTimeline"("eventType");
