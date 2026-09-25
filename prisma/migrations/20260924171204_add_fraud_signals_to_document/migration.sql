/*
  Warnings:

  - You are about to drop the column `extractionPipelineId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `structuralAnalysisId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `structuralLegacyId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `documentSingleId` on the `DocumentExtractionPipeline` table. All the data in the column will be lost.
  - You are about to drop the column `parentDocumentId` on the `DocumentExtractionPipeline` table. All the data in the column will be lost.
  - You are about to drop the column `documentLegacyId` on the `DocumentStructuralAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `documentMainId` on the `DocumentStructuralAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `versionNumber` on the `DocumentVersion` table. All the data in the column will be lost.
  - You are about to drop the `DocumentFraudSignal` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[documentId]` on the table `DocumentAiClassificationLayer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documentId]` on the table `DocumentExtractionPipeline` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documentId]` on the table `DocumentStructuralAnalysis` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documentId]` on the table `DocumentTransformationLog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `documentId` to the `DocumentExtractionPipeline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentId` to the `DocumentStructuralAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DocumentExtractionPipeline" DROP CONSTRAINT "DocumentExtractionPipeline_documentSingleId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentExtractionPipeline" DROP CONSTRAINT "DocumentExtractionPipeline_parentDocumentId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentFraudSignal" DROP CONSTRAINT "DocumentFraudSignal_documentId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentLineage" DROP CONSTRAINT "DocumentLineage_documentId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentStructuralAnalysis" DROP CONSTRAINT "DocumentStructuralAnalysis_documentLegacyId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentStructuralAnalysis" DROP CONSTRAINT "DocumentStructuralAnalysis_documentMainId_fkey";

-- DropIndex
DROP INDEX "Document_extractionPipelineId_key";

-- DropIndex
DROP INDEX "Document_structuralAnalysisId_key";

-- DropIndex
DROP INDEX "Document_structuralLegacyId_key";

-- DropIndex
DROP INDEX "DocumentExtractionPipeline_documentSingleId_key";

-- DropIndex
DROP INDEX "DocumentStructuralAnalysis_documentLegacyId_key";

-- DropIndex
DROP INDEX "DocumentStructuralAnalysis_documentMainId_key";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "extractionPipelineId",
DROP COLUMN "metadata",
DROP COLUMN "structuralAnalysisId",
DROP COLUMN "structuralLegacyId",
ADD COLUMN     "fraudSignals" JSONB;

-- AlterTable
ALTER TABLE "DocumentExtractionPipeline" DROP COLUMN "documentSingleId",
DROP COLUMN "parentDocumentId",
ADD COLUMN     "documentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DocumentLineage" ALTER COLUMN "documentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DocumentStructuralAnalysis" DROP COLUMN "documentLegacyId",
DROP COLUMN "documentMainId",
ADD COLUMN     "documentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DocumentVersion" DROP COLUMN "versionNumber",
ADD COLUMN     "url" TEXT,
ADD COLUMN     "version" INTEGER;

-- DropTable
DROP TABLE "DocumentFraudSignal";

-- CreateTable
CREATE TABLE "DocumentRiskSignal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentId" TEXT,
    "signalType" TEXT,
    "strength" DOUBLE PRECISION,
    "metadata" JSONB,

    CONSTRAINT "DocumentRiskSignal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentAiClassificationLayer_documentId_key" ON "DocumentAiClassificationLayer"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentExtractionPipeline_documentId_key" ON "DocumentExtractionPipeline"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentStructuralAnalysis_documentId_key" ON "DocumentStructuralAnalysis"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentTransformationLog_documentId_key" ON "DocumentTransformationLog"("documentId");

-- AddForeignKey
ALTER TABLE "DocumentLineage" ADD CONSTRAINT "DocumentLineage_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentStructuralAnalysis" ADD CONSTRAINT "DocumentStructuralAnalysis_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentExtractionPipeline" ADD CONSTRAINT "DocumentExtractionPipeline_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentRiskSignal" ADD CONSTRAINT "DocumentRiskSignal_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;
