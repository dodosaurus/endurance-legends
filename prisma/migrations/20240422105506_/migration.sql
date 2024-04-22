-- AlterTable
ALTER TABLE "StravaAccessToken" ADD COLUMN     "scope" TEXT NOT NULL DEFAULT 'read';

-- AlterTable
ALTER TABLE "StravaRefreshToken" ADD COLUMN     "scope" TEXT NOT NULL DEFAULT 'read';
