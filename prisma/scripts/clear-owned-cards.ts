import prisma from "../../server/db/db";

const main = async () => {
  await clearOwnedCards();
};

const clearOwnedCards = async () => {
  //delete whole OwnedCard table
  await prisma.ownedCard.deleteMany({});

  //delete records from Transaction table, where desc is "purchase_pack"
  await prisma.transaction.deleteMany({
    where: {
      desc: "purchase_pack",
    },
  });

  //on User record with username = "jozef_kov" set collectedCards to 0
  await prisma.user.updateMany({
    where: {
      username: "jozef_kov",
    },
    data: {
      collectedCards: 0,
    },
  });

  await prisma.$disconnect();
};

main();
