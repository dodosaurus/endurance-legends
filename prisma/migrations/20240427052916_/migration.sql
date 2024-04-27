-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "userAthleteId" INTEGER NOT NULL,
    "desc" TEXT NOT NULL DEFAULT '',
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userAthleteId_fkey" FOREIGN KEY ("userAthleteId") REFERENCES "User"("athleteId") ON DELETE CASCADE ON UPDATE CASCADE;
