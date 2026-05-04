/*
  Warnings:

  - The values [PRIVATE] on the enum `TemplateType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TemplateType_new" AS ENUM ('PUBLIC', 'TEAM');
ALTER TABLE "public"."Template" ALTER COLUMN "templateType" DROP DEFAULT;
ALTER TABLE "Template" ALTER COLUMN "templateType" TYPE "TemplateType_new" USING ("templateType"::text::"TemplateType_new");
ALTER TYPE "TemplateType" RENAME TO "TemplateType_old";
ALTER TYPE "TemplateType_new" RENAME TO "TemplateType";
DROP TYPE "public"."TemplateType_old";
ALTER TABLE "Template" ALTER COLUMN "templateType" SET DEFAULT 'PUBLIC';
COMMIT;
