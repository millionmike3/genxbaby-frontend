-- AddForeignKey
ALTER TABLE "Check" ADD CONSTRAINT "Check_bankProfileId_fkey" FOREIGN KEY ("bankProfileId") REFERENCES "BankProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
