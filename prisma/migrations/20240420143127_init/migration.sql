-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "strava_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "account_balance" INTEGER NOT NULL DEFAULT 0,
    "collected_cards" INTEGER NOT NULL DEFAULT 0,
    "in_app_since" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_active" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
