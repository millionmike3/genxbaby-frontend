-- AlterTable
ALTER TABLE "FraudResult" ADD COLUMN     "documentId" TEXT;

-- AddForeignKey
ALTER TABLE "FraudResult" ADD CONSTRAINT "FraudResult_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;
