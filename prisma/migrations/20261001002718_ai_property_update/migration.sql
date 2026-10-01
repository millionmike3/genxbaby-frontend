-- AlterTable
ALTER TABLE "ApplicationAiScoring" ADD COLUMN     "fico" INTEGER,
ADD COLUMN     "income" INTEGER,
ADD COLUMN     "propertyType" TEXT;

-- CreateTable
CREATE TABLE "UnderwriterDecision" (
    "id" TEXT NOT NULL,
    "underwriterId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "decision" TEXT NOT NULL,
    "decisionTimeMs" INTEGER NOT NULL,
    "finalOutcome" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnderwriterDecision_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UnderwriterDecision" ADD CONSTRAINT "UnderwriterDecision_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
