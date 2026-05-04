-- CreateEnum
CREATE TYPE "ScenarioType" AS ENUM ('ALL', 'UNCATEGORIZE', 'MODULETOOLS');

-- DropIndex
DROP INDEX "Scenario_dashboardId_idx";

-- AlterTable
ALTER TABLE "Org" ALTER COLUMN "timeZone" SET DEFAULT '(GMT+05:30) Asia/Kolkata';

-- AlterTable
ALTER TABLE "Scenario" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "dataTransfer" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scenarioType" "ScenarioType" DEFAULT 'UNCATEGORIZE',
ALTER COLUMN "visibility" SET DEFAULT 'PUBLIC';

-- CreateIndex
CREATE INDEX "Scenario_dashboardId_title_idx" ON "Scenario"("dashboardId", "title");
