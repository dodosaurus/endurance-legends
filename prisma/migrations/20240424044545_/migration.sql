/*
  Warnings:

  - You are about to drop the `StravaAccessToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StravaRefreshToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StravaAccessToken" DROP CONSTRAINT "StravaAccessToken_userAthleteId_fkey";

-- DropForeignKey
ALTER TABLE "StravaRefreshToken" DROP CONSTRAINT "StravaRefreshToken_userAthleteId_fkey";

-- DropTable
DROP TABLE "StravaAccessToken";

-- DropTable
DROP TABLE "StravaRefreshToken";

-- CreateTable
CREATE TABLE "StravaSession" (
    "id" SERIAL NOT NULL,
    "userAthleteId" INTEGER NOT NULL,
    "refreshTokenCode" TEXT NOT NULL,
    "accessTokenCode" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "scope" TEXT NOT NULL DEFAULT 'read',

    CONSTRAINT "StravaSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StravaSession_userAthleteId_key" ON "StravaSession"("userAthleteId");

-- CreateIndex
CREATE UNIQUE INDEX "StravaSession_refreshTokenCode_key" ON "StravaSession"("refreshTokenCode");

-- CreateIndex
CREATE UNIQUE INDEX "StravaSession_accessTokenCode_key" ON "StravaSession"("accessTokenCode");

-- AddForeignKey
ALTER TABLE "StravaSession" ADD CONSTRAINT "StravaSession_userAthleteId_fkey" FOREIGN KEY ("userAthleteId") REFERENCES "User"("athleteId") ON DELETE CASCADE ON UPDATE CASCADE;
