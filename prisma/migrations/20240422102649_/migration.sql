-- AlterTable
ALTER TABLE "StravaAccessToken" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "StravaAccessToken_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StravaRefreshToken" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "StravaRefreshToken_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'not specified',
ADD COLUMN     "profile" TEXT NOT NULL DEFAULT 'url to default avatar large',
ADD COLUMN     "profileMedium" TEXT NOT NULL DEFAULT 'url to default avatar small';
