-- CreateTable
CREATE TABLE "OwnedCard" (
    "id" SERIAL NOT NULL,
    "userAthleteId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,
    "acquiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numberOfCopies" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "OwnedCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OwnedCard" ADD CONSTRAINT "OwnedCard_userAthleteId_fkey" FOREIGN KEY ("userAthleteId") REFERENCES "User"("athleteId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnedCard" ADD CONSTRAINT "OwnedCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
