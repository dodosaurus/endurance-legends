/*
  Warnings:

  - Made the column `cardImageUrl` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "cardImageUrl" SET NOT NULL,
ALTER COLUMN "cardImageUrl" SET DEFAULT 'next.svg';
