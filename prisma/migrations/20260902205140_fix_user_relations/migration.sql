/*
  Warnings:

  - The `userId` column on the `BluetoothEvent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Pillar" AS ENUM ('STOCK_SANITIZER', 'CUSTOMER', 'INVESTOR');

-- AlterTable
ALTER TABLE "BluetoothEvent" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "BehaviorProfile" (
    "id" TEXT NOT NULL,
    "investorId" TEXT,
    "leadId" TEXT,
    "userId" INTEGER,
    "pillar" "Pillar" NOT NULL,
    "score" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BehaviorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BehaviorEvent" (
    "id" TEXT NOT NULL,
    "userId" INTEGER,
    "leadId" TEXT,
    "investorId" TEXT,
    "pillar" "Pillar" NOT NULL,
    "page" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "impulsivenessScore" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BehaviorEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BluetoothEvent" ADD CONSTRAINT "BluetoothEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BluetoothEvent" ADD CONSTRAINT "BluetoothEvent_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "BehaviorEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviorProfile" ADD CONSTRAINT "BehaviorProfile_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviorProfile" ADD CONSTRAINT "BehaviorProfile_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviorProfile" ADD CONSTRAINT "BehaviorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviorEvent" ADD CONSTRAINT "BehaviorEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviorEvent" ADD CONSTRAINT "BehaviorEvent_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehaviorEvent" ADD CONSTRAINT "BehaviorEvent_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
