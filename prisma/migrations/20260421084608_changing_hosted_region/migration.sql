/*
  Warnings:

  - You are about to drop the column `hostedReason` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hostedReason",
ADD COLUMN     "hostedRegion" TEXT;
