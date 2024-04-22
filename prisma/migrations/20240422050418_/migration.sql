/*
  Warnings:

  - You are about to drop the column `userStravaId` on the `StravaAccessToken` table. All the data in the column will be lost.
  - You are about to drop the column `userStravaId` on the `StravaRefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `stravaId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[athleteId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userAthleteId` to the `StravaAccessToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAthleteId` to the `StravaRefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `athleteId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StravaAccessToken" DROP CONSTRAINT "StravaAccessToken_userStravaId_fkey";

-- DropForeignKey
ALTER TABLE "StravaRefreshToken" DROP CONSTRAINT "StravaRefreshToken_userStravaId_fkey";

-- DropIndex
DROP INDEX "User_stravaId_key";

-- AlterTable
ALTER TABLE "StravaAccessToken" DROP COLUMN "userStravaId",
ADD COLUMN     "userAthleteId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StravaRefreshToken" DROP COLUMN "userStravaId",
ADD COLUMN     "userAthleteId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "stravaId",
ADD COLUMN     "athleteId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_athleteId_key" ON "User"("athleteId");

-- AddForeignKey
ALTER TABLE "StravaRefreshToken" ADD CONSTRAINT "StravaRefreshToken_userAthleteId_fkey" FOREIGN KEY ("userAthleteId") REFERENCES "User"("athleteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StravaAccessToken" ADD CONSTRAINT "StravaAccessToken_userAthleteId_fkey" FOREIGN KEY ("userAthleteId") REFERENCES "User"("athleteId") ON DELETE RESTRICT ON UPDATE CASCADE;
