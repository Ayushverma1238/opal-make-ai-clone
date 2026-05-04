/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Dashboard` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `emailVerified` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CustomApp" ADD COLUMN     "audience" TEXT DEFAULT 'Global',
ADD COLUMN     "country" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "label" TEXT,
ADD COLUMN     "language" TEXT DEFAULT 'English';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Dashboard_userId_key" ON "Dashboard"("userId");
