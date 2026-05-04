/*
  Warnings:

  - Changed the type of `status` on the `ScenarioExecution` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TemplateType" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "ExecutionStatus" AS ENUM ('PENDING', 'RUNNING', 'SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "Scenario" ADD COLUMN     "templateId" TEXT,
ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ScenarioExecution" DROP COLUMN "status",
ADD COLUMN     "status" "ExecutionStatus" NOT NULL;

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL,
    "templateType" "TemplateType" NOT NULL DEFAULT 'PUBLIC',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "imageUrl" TEXT,
    "theme" TEXT,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateApp" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "appId" TEXT NOT NULL,

    CONSTRAINT "TemplateApp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TemplateApp_templateId_appId_key" ON "TemplateApp"("templateId", "appId");

-- AddForeignKey
ALTER TABLE "Scenario" ADD CONSTRAINT "Scenario_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateApp" ADD CONSTRAINT "TemplateApp_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateApp" ADD CONSTRAINT "TemplateApp_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;
