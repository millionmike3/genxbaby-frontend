-- CreateTable
CREATE TABLE "StockEvent" (
    "id" TEXT NOT NULL,
    "userId" INTEGER,
    "investorId" TEXT,
    "leadId" TEXT,
    "page" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rssi" INTEGER,
    "signalStrength" INTEGER,
    "metadata" JSONB,

    CONSTRAINT "StockEvent_pkey" PRIMARY KEY ("id")
);
