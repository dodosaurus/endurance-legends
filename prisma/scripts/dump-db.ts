import prisma from "../../server/db/db";
const fs = require("fs");

const main = async () => {
  await dumpDb();
};

const dumpDb = async () => {
  //dump all tables to JSON, with current timestamp in filename, saving it to current prisma/dumps directory
  const timestamp = new Date().toISOString();

  const whole_json = {
    users: await prisma.user.findMany(),
    activities: await prisma.activity.findMany(),
    ownedCards: await prisma.ownedCard.findMany(),
    cards: await prisma.card.findMany(),
    stravaSessions: await prisma.stravaSession.findMany(),
    transactions: await prisma.transaction.findMany(),
  };

  await prisma.$disconnect();

  // Convert JSON data to string
  const jsonString = JSON.stringify(whole_json);

  // Write JSON string to a file
  fs.writeFileSync(`./prisma/dumps/${timestamp}.json`, jsonString);
};

main();
