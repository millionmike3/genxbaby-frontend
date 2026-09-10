/*
  Warnings:

  - Added the required column `userId` to the `Borrower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Borrower" ADD COLUMN     "userId" TEXT NOT NULL;
