-- DropForeignKey
ALTER TABLE "StravaAccessToken" DROP CONSTRAINT "StravaAccessToken_userAthleteId_fkey";

-- DropForeignKey
ALTER TABLE "StravaRefreshToken" DROP CONSTRAINT "StravaRefreshToken_userAthleteId_fkey";

-- AddForeignKey
ALTER TABLE "StravaRefreshToken" ADD CONSTRAINT "StravaRefreshToken_userAthleteId_fkey" FOREIGN KEY ("userAthleteId") REFERENCES "User"("athleteId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StravaAccessToken" ADD CONSTRAINT "StravaAccessToken_userAthleteId_fkey" FOREIGN KEY ("userAthleteId") REFERENCES "User"("athleteId") ON DELETE CASCADE ON UPDATE CASCADE;
