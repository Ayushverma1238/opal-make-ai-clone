/*
  Warnings:

  - You are about to drop the column `expires_at` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `id_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `session_state` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `token_type` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hostedRegion` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('SUCCESS', 'FAILED', 'PENDING');

-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('FREE', 'PRO', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "ScenarioStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ScenarioVisibility" AS ENUM ('PRIVATE', 'TEAM', 'PUBLIC');

-- CreateEnum
CREATE TYPE "CredentialType" AS ENUM ('CONNECTION', 'API_KEY');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "HttpMethod" AS ENUM ('GET', 'POST', 'PUT', 'DELETE');

-- CreateEnum
CREATE TYPE "WebhookStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ToolType" AS ENUM ('SCENARIO', 'MODULE');

-- CreateEnum
CREATE TYPE "FieldKind" AS ENUM ('INPUT', 'OUTPUT');

-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('ARRAY', 'COLLECTION', 'DATE', 'TEXT', 'NUMBER', 'BOOLEAN', 'BINARY_DATA');

-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('GOOGLE', 'GMAIL', 'PLAY_STORE', 'APPLE', 'OTHER');

-- CreateEnum
CREATE TYPE "AppMode" AS ENUM ('READ_ONLY', 'EDITABLE', 'ADMIN_ONLY');

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "expires_at",
DROP COLUMN "id_token",
DROP COLUMN "scope",
DROP COLUMN "session_state",
DROP COLUMN "token_type",
DROP COLUMN "type";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "country",
DROP COLUMN "emailVerified",
DROP COLUMN "hostedRegion",
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "Dashboard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Org" (
    "id" TEXT NOT NULL,
    "dashboardId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsageStats" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "creditsLeft" INTEGER NOT NULL DEFAULT 1000,
    "averageDailyUsage" INTEGER NOT NULL DEFAULT 0,
    "activeScenarios" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UsageStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DashboardUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "orgId" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "teamId" TEXT,

    CONSTRAINT "DashboardUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" "PlanType" NOT NULL,
    "price" INTEGER NOT NULL,
    "credits" INTEGER NOT NULL,
    "maxScenarios" INTEGER NOT NULL,
    "maxTeams" INTEGER NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "billing" "BillingCycle" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subscriptionId" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "PaymentStatus" NOT NULL,
    "method" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scenario" (
    "id" TEXT NOT NULL,
    "dashboardId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "ScenarioStatus" NOT NULL DEFAULT 'INACTIVE',
    "visibility" "ScenarioVisibility" NOT NULL DEFAULT 'PRIVATE',
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scenario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScenarioExecution" (
    "id" TEXT NOT NULL,
    "scenarioId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "logs" JSONB,

    CONSTRAINT "ScenarioExecution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MCPTool" (
    "id" TEXT NOT NULL,
    "dashboardId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ToolType" NOT NULL,
    "config" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "MCPTool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MCPToolField" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "FieldType" NOT NULL,
    "kind" "FieldKind" NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MCPToolField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MCPToolLog" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "output" JSONB,
    "success" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MCPToolLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Webhook" (
    "id" TEXT NOT NULL,
    "dashboardId" TEXT NOT NULL,
    "toolId" TEXT,
    "endpoint" TEXT NOT NULL,
    "method" "HttpMethod" NOT NULL,
    "status" "WebhookStatus" NOT NULL,
    "secret" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Webhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebhookLog" (
    "id" TEXT NOT NULL,
    "webhookId" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebhookLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataStore" (
    "id" TEXT NOT NULL,
    "dashboardId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DataStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataStoreRecord" (
    "id" TEXT NOT NULL,
    "dataStoreId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB,

    CONSTRAINT "DataStoreRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credential" (
    "id" TEXT NOT NULL,
    "dashboardId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CredentialType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL,
    "credentialId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CredentialKey" (
    "id" TEXT NOT NULL,
    "credentialId" TEXT NOT NULL,
    "keyName" TEXT NOT NULL,
    "keyValue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CredentialKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "dashboardId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DeviceType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceAccessToken" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeviceAccessToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomApp" (
    "id" TEXT NOT NULL,
    "dashboardId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "theme" TEXT NOT NULL DEFAULT '#000',
    "mode" "AppMode" NOT NULL DEFAULT 'EDITABLE',

    CONSTRAINT "CustomApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variable" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Variable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Dashboard_userId_idx" ON "Dashboard"("userId");

-- CreateIndex
CREATE INDEX "Org_dashboardId_idx" ON "Org"("dashboardId");

-- CreateIndex
CREATE UNIQUE INDEX "UsageStats_orgId_key" ON "UsageStats"("orgId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_orgId_name_key" ON "Team"("orgId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_name_key" ON "Plan"("name");

-- CreateIndex
CREATE INDEX "Scenario_dashboardId_idx" ON "Scenario"("dashboardId");

-- CreateIndex
CREATE INDEX "ScenarioExecution_scenarioId_idx" ON "ScenarioExecution"("scenarioId");

-- CreateIndex
CREATE INDEX "MCPTool_dashboardId_idx" ON "MCPTool"("dashboardId");

-- CreateIndex
CREATE UNIQUE INDEX "MCPToolField_toolId_name_kind_key" ON "MCPToolField"("toolId", "name", "kind");

-- CreateIndex
CREATE UNIQUE INDEX "Webhook_endpoint_key" ON "Webhook"("endpoint");

-- CreateIndex
CREATE UNIQUE INDEX "DataStore_dashboardId_name_key" ON "DataStore"("dashboardId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "DataStoreRecord_dataStoreId_key_key" ON "DataStoreRecord"("dataStoreId", "key");

-- CreateIndex
CREATE INDEX "Credential_dashboardId_idx" ON "Credential"("dashboardId");

-- CreateIndex
CREATE INDEX "Device_dashboardId_idx" ON "Device"("dashboardId");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceAccessToken_token_key" ON "DeviceAccessToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "CustomApp_dashboardId_name_key" ON "CustomApp"("dashboardId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Variable_orgId_name_key" ON "Variable"("orgId", "name");

-- AddForeignKey
ALTER TABLE "Dashboard" ADD CONSTRAINT "Dashboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Org" ADD CONSTRAINT "Org_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsageStats" ADD CONSTRAINT "UsageStats_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DashboardUser" ADD CONSTRAINT "DashboardUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DashboardUser" ADD CONSTRAINT "DashboardUser_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DashboardUser" ADD CONSTRAINT "DashboardUser_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scenario" ADD CONSTRAINT "Scenario_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScenarioExecution" ADD CONSTRAINT "ScenarioExecution_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCPTool" ADD CONSTRAINT "MCPTool_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCPToolField" ADD CONSTRAINT "MCPToolField_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "MCPTool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCPToolLog" ADD CONSTRAINT "MCPToolLog_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "MCPTool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "MCPTool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebhookLog" ADD CONSTRAINT "WebhookLog_webhookId_fkey" FOREIGN KEY ("webhookId") REFERENCES "Webhook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataStore" ADD CONSTRAINT "DataStore_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataStoreRecord" ADD CONSTRAINT "DataStoreRecord_dataStoreId_fkey" FOREIGN KEY ("dataStoreId") REFERENCES "DataStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CredentialKey" ADD CONSTRAINT "CredentialKey_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAccessToken" ADD CONSTRAINT "DeviceAccessToken_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomApp" ADD CONSTRAINT "CustomApp_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variable" ADD CONSTRAINT "Variable_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE CASCADE ON UPDATE CASCADE;
