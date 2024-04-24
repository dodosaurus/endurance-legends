-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" TEXT DEFAULT 'not specified',
ALTER COLUMN "country" DROP NOT NULL;
