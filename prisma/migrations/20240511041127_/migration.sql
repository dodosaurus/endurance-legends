/*
  Warnings:

  - You are about to drop the column `collectedCards` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "collectedCards",
ADD COLUMN     "lastOpenedPack" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
