-- CreateEnum
CREATE TYPE "VariableType" AS ENUM ('ALL', 'CUSTOM', 'SYSTEM');

-- CreateEnum
CREATE TYPE "VariableName" AS ENUM ('TEAM', 'ORGANIZATION');

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "currency" SET DEFAULT 'DOLLER';

-- AlterTable
ALTER TABLE "Variable" ADD COLUMN     "dataType" TEXT,
ADD COLUMN     "type" "VariableType",
ADD COLUMN     "variableFor" TEXT,
ADD COLUMN     "variableName" "VariableName";
