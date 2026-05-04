/*
  Warnings:

  - A unique constraint covering the columns `[dashboardId,endpoint]` on the table `Webhook` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_orgId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_ownerId_fkey";

-- DropIndex
DROP INDEX "Dashboard_userId_key";

-- DropIndex
DROP INDEX "Webhook_endpoint_key";

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastLoginAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Webhook" ALTER COLUMN "endpoint" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Webhook_dashboardId_endpoint_key" ON "Webhook"("dashboardId", "endpoint");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
