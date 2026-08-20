-- CreateTable
CREATE TABLE "AnchorRecord" (
    "id" TEXT NOT NULL,
    "merkleRoot" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnchorRecord_pkey" PRIMARY KEY ("id")
);
