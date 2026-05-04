/*
  Warnings:

  - You are about to drop the `TemplateApp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TemplateApp" DROP CONSTRAINT "TemplateApp_appId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateApp" DROP CONSTRAINT "TemplateApp_templateId_fkey";

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "templateApps" TEXT[];

-- DropTable
DROP TABLE "TemplateApp";
