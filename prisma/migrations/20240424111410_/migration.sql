-- AlterTable
ALTER TABLE "User" ADD COLUMN     "totalRideDistance" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalRunDistance" INTEGER NOT NULL DEFAULT 0;
