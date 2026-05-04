/*
  Warnings:

  - You are about to drop the column `billing` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title,billing]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `billing` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Plan_name_key";

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "billing" "BillingCycle" NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "billing";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "country" SET DEFAULT 'India',
ALTER COLUMN "hostedRegion" SET DEFAULT 'EU';

-- CreateIndex
CREATE UNIQUE INDEX "Plan_title_billing_key" ON "Plan"("title", "billing");
