/*
  Warnings:

  - You are about to drop the column `notes` on the `LeadEvent` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `LeadEvent` table. All the data in the column will be lost.
  - Added the required column `eventType` to the `LeadEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LeadEvent" DROP COLUMN "notes",
DROP COLUMN "type",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "element" TEXT,
ADD COLUMN     "eventType" TEXT NOT NULL,
ADD COLUMN     "lateNight" BOOLEAN,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "page" TEXT,
ADD COLUMN     "responseTimeMs" INTEGER,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
