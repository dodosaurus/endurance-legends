import { Prisma, Card, PrismaClient } from "@prisma/client";
import latest_raw from "./latest_raw.json";

const prisma = new PrismaClient();

//custom type
const cardCoreData = Prisma.validator<Prisma.CardDefaultArgs>()({
  select: { name: true, country: true, dateInfo: true, additionalInfo1: true, additionalInfo2: true },
});
type CardCoreData = Prisma.CardGetPayload<typeof cardCoreData>;

const main = async () => {
  try {
    await prisma.card.deleteMany()

    // map and prepare cyclists
    const cyclist_batch = latest_raw.cyclists.map((cyclist) => {
      let w_and_h = `${cyclist.weight.toString()} kg / ${cyclist.height.toString()} m`;
      return {
        name: cyclist.name,
        country: cyclist.country,
        dateInfo: cyclist.birthdate,
        additionalInfo1: cyclist.team,
        additionalInfo2: w_and_h,
        rarity: "common",
      };
    });

    // map and prepare races
    const race_batch = latest_raw.races.map((race) => {
      let rarity = "uncommon";

      if (race.class === "2.UWT") {
        rarity = "uncommon";
      }

      if (race.class === "1.UWT") {
        rarity = "rare";
      }

      //monument
      if (race.class.includes("1.UWT - M")) {
        rarity = "epic";
      }

      //grand tour
      if (race.class.includes("2.UWT - G")) {
        rarity = "legendary";
      }

      return {
        name: race.name,
        country: race.country,
        dateInfo: race.date,
        additionalInfo1: race.lastWinner,
        additionalInfo2: race.class,
        rarity,
      };
    });

    const final_arr: CardCoreData[] = [...cyclist_batch, ...race_batch];

    const db_cards = await prisma.card.createMany({
      data: final_arr,
    });

    console.log(db_cards)

    console.log(`Database has been seeded. 🌱`);
  } catch (error) {
    throw error;
  }
};

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
