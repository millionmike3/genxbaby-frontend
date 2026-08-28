/*
  Warnings:

  - Added the required column `updatedAt` to the `Investor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Investor" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
