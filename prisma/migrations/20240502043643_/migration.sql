/*
  Warnings:

  - You are about to drop the column `info` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "info",
ADD COLUMN     "additionalInfo1" TEXT DEFAULT '',
ADD COLUMN     "additionalInfo2" TEXT DEFAULT '',
ADD COLUMN     "country" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "dateInfo" TEXT DEFAULT '',
ADD COLUMN     "extendedInfo" TEXT DEFAULT '';
