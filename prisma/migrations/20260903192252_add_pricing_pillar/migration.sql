-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Pillar" ADD VALUE 'BEHAVIOR';
ALTER TYPE "Pillar" ADD VALUE 'BLUETOOTH';
ALTER TYPE "Pillar" ADD VALUE 'STOCK';
ALTER TYPE "Pillar" ADD VALUE 'PRICING';

-- CreateTable
CREATE TABLE "LLPAGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "LLPAGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LLPAAdjustment" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "bps" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "minFico" INTEGER,
    "maxFico" INTEGER,
    "minLtv" DOUBLE PRECISION,
    "maxLtv" DOUBLE PRECISION,
    "occupancy" TEXT,
    "propertyType" TEXT,
    "purpose" TEXT,
    "loanType" TEXT,
    "termMonths" INTEGER,
    "state" TEXT,
    "firstTimeHomebuyer" BOOLEAN,
    "minImpulsivenessScore" INTEGER,
    "maxImpulsivenessScore" INTEGER,
    "requiresBluetoothPresence" BOOLEAN,

    CONSTRAINT "LLPAAdjustment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LLPAAdjustment" ADD CONSTRAINT "LLPAAdjustment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "LLPAGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
