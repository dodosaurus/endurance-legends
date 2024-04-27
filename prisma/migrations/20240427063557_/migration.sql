-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "bonusTriggered" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "linkedActivity" TEXT NOT NULL DEFAULT '';
