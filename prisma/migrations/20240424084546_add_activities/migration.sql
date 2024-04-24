-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('RUN', 'RIDE');

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "userAthleteId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Activity',
    "type" "ActivityType" NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "movingTime" INTEGER NOT NULL,
    "elapsedTime" INTEGER NOT NULL,
    "totalElevationGain" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL,
    "startDateLocal" TIMESTAMP(3) NOT NULL,
    "locationCountry" TEXT NOT NULL,
    "kudosCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activity_activityId_key" ON "Activity"("activityId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userAthleteId_fkey" FOREIGN KEY ("userAthleteId") REFERENCES "User"("athleteId") ON DELETE CASCADE ON UPDATE CASCADE;
