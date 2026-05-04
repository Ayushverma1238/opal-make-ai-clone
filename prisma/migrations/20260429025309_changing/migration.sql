/*
  Warnings:

  - You are about to drop the column `description` on the `CustomApp` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `CustomApp` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `CustomApp` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dashboardId,appName]` on the table `CustomApp` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appName` to the `CustomApp` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AppType" AS ENUM ('EXAMPLE', 'CUSTOM');

-- DropIndex
DROP INDEX "CustomApp_dashboardId_name_key";

-- AlterTable
ALTER TABLE "CustomApp" DROP COLUMN "description",
DROP COLUMN "label",
DROP COLUMN "name",
ADD COLUMN     "appLogo" TEXT,
ADD COLUMN     "appName" TEXT NOT NULL,
ADD COLUMN     "module" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "type" "AppType" NOT NULL DEFAULT 'CUSTOM';

-- AlterTable
ALTER TABLE "DashboardUser" ALTER COLUMN "role" SET DEFAULT 'ADMIN';

-- CreateIndex
CREATE UNIQUE INDEX "CustomApp_dashboardId_appName_key" ON "CustomApp"("dashboardId", "appName");
