/*
  Warnings:

  - You are about to drop the column `account_balance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `collected_cards` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `in_app_since` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_active` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `strava_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stravaId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stravaId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "account_balance",
DROP COLUMN "collected_cards",
DROP COLUMN "in_app_since",
DROP COLUMN "last_active",
DROP COLUMN "strava_id",
ADD COLUMN     "accountBalance" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "collectedCards" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "inAppSince" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "stravaId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "StravaRefreshToken" (
    "userStravaId" INTEGER NOT NULL,
    "refreshTokenCode" TEXT NOT NULL,
    "scope" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "StravaAccessToken" (
    "userStravaId" INTEGER NOT NULL,
    "accessTokenCode" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StravaRefreshToken_refreshTokenCode_key" ON "StravaRefreshToken"("refreshTokenCode");

-- CreateIndex
CREATE UNIQUE INDEX "StravaAccessToken_accessTokenCode_key" ON "StravaAccessToken"("accessTokenCode");

-- CreateIndex
CREATE UNIQUE INDEX "User_stravaId_key" ON "User"("stravaId");

-- AddForeignKey
ALTER TABLE "StravaRefreshToken" ADD CONSTRAINT "StravaRefreshToken_userStravaId_fkey" FOREIGN KEY ("userStravaId") REFERENCES "User"("stravaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StravaAccessToken" ADD CONSTRAINT "StravaAccessToken_userStravaId_fkey" FOREIGN KEY ("userStravaId") REFERENCES "User"("stravaId") ON DELETE RESTRICT ON UPDATE CASCADE;
