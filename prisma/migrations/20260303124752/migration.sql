/*
  Warnings:

  - A unique constraint covering the columns `[email,code,type]` on the table `verification_codes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `verification_codes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VerificationCodeType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- DropIndex
DROP INDEX "verification_codes_email_code_key";

-- DropIndex
DROP INDEX "verification_codes_email_expires_at_idx";

-- DropIndex
DROP INDEX "verification_codes_expires_at_idx";

-- AlterTable
ALTER TABLE "verification_codes" ADD COLUMN     "type" "VerificationCodeType" NOT NULL;

-- CreateIndex
CREATE INDEX "verification_codes_email_type_expires_at_idx" ON "verification_codes"("email", "type", "expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "verification_codes_email_code_type_key" ON "verification_codes"("email", "code", "type");
