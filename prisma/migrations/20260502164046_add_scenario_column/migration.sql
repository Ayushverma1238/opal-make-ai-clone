-- AddForeignKey
ALTER TABLE "Scenario" ADD CONSTRAINT "Scenario_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
