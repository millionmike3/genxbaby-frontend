/*
  Warnings:

  - A unique constraint covering the columns `[servicingRecordId]` on the table `ServicingEventScore` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[servicingRecordId]` on the table `ServicingRiskSignal` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "LoanServicingEvent" ADD COLUMN     "servicingRecordId" TEXT;

-- AlterTable
ALTER TABLE "ServicingEventScore" ADD COLUMN     "servicingRecordId" TEXT;

-- AlterTable
ALTER TABLE "ServicingRiskSignal" ADD COLUMN     "servicingRecordId" TEXT;

-- CreateTable
CREATE TABLE "ServicingRecord" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "nextPaymentDue" TIMESTAMP(3),
    "escrowBalance" DOUBLE PRECISION DEFAULT 0,
    "delinquencyDays" INTEGER DEFAULT 0,
    "performanceScore" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "ServicingRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServicingRecord_applicationId_key" ON "ServicingRecord"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "ServicingEventScore_servicingRecordId_key" ON "ServicingEventScore"("servicingRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "ServicingRiskSignal_servicingRecordId_key" ON "ServicingRiskSignal"("servicingRecordId");

-- AddForeignKey
ALTER TABLE "LoanServicingEvent" ADD CONSTRAINT "LoanServicingEvent_servicingRecordId_fkey" FOREIGN KEY ("servicingRecordId") REFERENCES "ServicingRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicingEventScore" ADD CONSTRAINT "ServicingEventScore_servicingRecordId_fkey" FOREIGN KEY ("servicingRecordId") REFERENCES "ServicingRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicingRiskSignal" ADD CONSTRAINT "ServicingRiskSignal_servicingRecordId_fkey" FOREIGN KEY ("servicingRecordId") REFERENCES "ServicingRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicingRecord" ADD CONSTRAINT "ServicingRecord_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
