-- DropEnum
DROP TYPE "ActivityType";

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "collectionId" INTEGER NOT NULL DEFAULT 1,
    "rarity" TEXT NOT NULL DEFAULT 'common',
    "name" TEXT NOT NULL DEFAULT '',
    "info" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);
