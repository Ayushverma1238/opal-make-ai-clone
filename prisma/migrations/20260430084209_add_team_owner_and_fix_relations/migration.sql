/*
  Warnings:

  - You are about to drop the column `orgId` on the `DashboardUser` table. All the data in the column will be lost.
  - You are about to drop the column `maxLimit` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `operations` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,teamId]` on the table `DashboardUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,teamId]` on the table `DashboardUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `DashboardUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `DashboardUser` table without a default value. This is not possible if the table is not empty.
  - Made the column `teamId` on table `DashboardUser` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ownerId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DashboardUser" DROP CONSTRAINT "DashboardUser_orgId_fkey";

-- DropForeignKey
ALTER TABLE "DashboardUser" DROP CONSTRAINT "DashboardUser_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_orgId_fkey";

-- DropIndex
DROP INDEX "Team_orgId_name_key";

-- AlterTable
ALTER TABLE "DashboardUser" DROP COLUMN "orgId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "role" DROP DEFAULT,
ALTER COLUMN "teamId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "maxLimit",
DROP COLUMN "operations",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "emailVerified" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "DashboardUser_teamId_idx" ON "DashboardUser"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "DashboardUser_email_teamId_key" ON "DashboardUser"("email", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "DashboardUser_userId_teamId_key" ON "DashboardUser"("userId", "teamId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DashboardUser" ADD CONSTRAINT "DashboardUser_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
