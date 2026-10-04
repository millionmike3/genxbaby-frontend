-- AlterTable
ALTER TABLE "UnderwritingCase" ADD COLUMN     "ausFinding" TEXT,
ADD COLUMN     "conditions" TEXT,
ADD COLUMN     "decision" TEXT,
ADD COLUMN     "routingScore" DOUBLE PRECISION;
