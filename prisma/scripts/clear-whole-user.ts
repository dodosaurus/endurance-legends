import prisma from "../../server/db/db";

const main = async () => {
  await clearWholeUser();
};

const target_user = "jozef_kov";
// const target_user = "maria_kovacova";
// const target_user = "jozef_kovac";
// const target_user = "strava_athlete";

const clearWholeUser = async () => {
  //delete whole activites only for target user
  await prisma.activity.deleteMany({
    where: {
      user: {
        username: target_user,
      },
    },
  });

  //delete whole owned cards only for target user
  await prisma.ownedCard.deleteMany({
    where: {
      user: {
        username: target_user,
      },
    },
  });

  //delete whole transactions only for target user
  await prisma.transaction.deleteMany({
    where: {
      user: {
        username: target_user,
      },
    },
  });

  //delete session in DB for traget user
  await prisma.stravaSession.deleteMany({
    where: {
      user: {
        username: target_user,
      },
    },
  });

  //finally delete user record
  await prisma.user.deleteMany({
    where: {
      username: target_user,
    },
  });

  await prisma.$disconnect();
};

main();
