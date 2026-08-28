/*
  Warnings:

  - A unique constraint covering the columns `[checkNumber]` on the table `Check` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `severity` to the `FraudFlag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankProfile" ADD COLUMN     "accountType" TEXT,
ADD COLUMN     "signatureImage" TEXT,
ADD COLUMN     "signatureUrl" TEXT,
ADD COLUMN     "signerName" TEXT;

-- AlterTable
ALTER TABLE "FraudFlag" ADD COLUMN     "severity" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SuspiciousActivityReport" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "severity" TEXT,
    "flagId" TEXT,
    "checkId" TEXT,

    CONSTRAINT "SuspiciousActivityReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SarFlag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SarFlag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "signatureImage" TEXT,
    "signatureUrl" TEXT,
    "bankProfileId" INTEGER NOT NULL,

    CONSTRAINT "Signer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Check_checkNumber_key" ON "Check"("checkNumber");

-- AddForeignKey
ALTER TABLE "Check" ADD CONSTRAINT "Check_signerId_fkey" FOREIGN KEY ("signerId") REFERENCES "Signer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuspiciousActivityReport" ADD CONSTRAINT "SuspiciousActivityReport_flagId_fkey" FOREIGN KEY ("flagId") REFERENCES "SarFlag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuspiciousActivityReport" ADD CONSTRAINT "SuspiciousActivityReport_checkId_fkey" FOREIGN KEY ("checkId") REFERENCES "Check"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signer" ADD CONSTRAINT "Signer_bankProfileId_fkey" FOREIGN KEY ("bankProfileId") REFERENCES "BankProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
