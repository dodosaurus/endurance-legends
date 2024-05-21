import { Card } from "@prisma/client";
import prisma from "./db/db";
import { PACK_PRICE, PACK_SIZE } from "@/lib/constants";
import { createTransaction } from "./db/queries";
import { recalcAccountBalance } from "./calculations";

export async function generateAssignmentOfNewCards(athleteId: number): Promise<{ chosenCards: Card[] }> {
  const cards: Card[] = [];

  //generate random card acquirement - 3 common + 1 higher rarity (uncommon, rare, epic, legendary)

  //generate three random common cards, each one should be unique
  const commonCards = await prisma.card.findMany({
    where: {
      rarity: "common",
    },
  });

  for (let i = 0; i < 3; i++) {
    const randomCardIndex = Math.floor(Math.random() * commonCards.length);
    const randomCard = commonCards[randomCardIndex];
    cards.push(randomCard);
    commonCards.splice(randomCardIndex, 1);
  }
  const alreadyChosenCards = cards;

  const lastCard = await rollAndChooseLastCard(alreadyChosenCards);

  cards.push(lastCard);

  return {
    chosenCards: cards,
  };
}

export async function assignNewCardSetToOwner(athleteId: number, cards: Card[]) {
  //get user and its already owned cards
  const user = await prisma.user.findUnique({
    where: {
      athleteId,
    },
    include: {
      ownedCards: true,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }
  if (user.accountBalance < PACK_PRICE) {
    throw new Error("User does not have enough coins.");
  }

  //create new transaction to reduce the number of accountBalance on fetch in dasboard
  await createTransaction(-PACK_PRICE, "purchase_pack");
  const newAccountBalance = await recalcAccountBalance();

  const alreadyOwnedCards = user.ownedCards;
  const duplicatesIds: number[] = [];

  //we need to distinguish batch of cards that are already in user's collection, and just raise the number of copies
  cards.map((card) => {
    const alreadyOwnedCard = alreadyOwnedCards.find((ownedCard) => ownedCard.cardId === card.id);
    if (alreadyOwnedCard) {
      duplicatesIds.push(alreadyOwnedCard.id);
    }
  });

  //iteration modifier of number of UNIQUE collected cards, so we need to subtract duplicates
  const newCollectedCardsCount = PACK_SIZE - duplicatesIds.length;

  //create each new ownedCard on user based on cardIds, and raise the number of collectedCards
  const { accountBalance } = await prisma.user.update({
    where: {
      athleteId,
    },
    data: {
      ownedCards: {
        create: cards.map((card) => ({
          cardId: card.id,
        })),
      },
      collectedCards: {
        increment: newCollectedCardsCount,
      },
      accountBalance: newAccountBalance,
    },
  });

  return { cards, accountBalance };
}

async function rollAndChooseLastCard(alreadyChosenCommonCards: Card[]): Promise<Card> {
  let chosenRarity = "common";

  const rarityRoll = Math.floor(Math.random() * 100) + 1;

  // 50% chance of getting common again
  if (rarityRoll <= 50) {
    chosenRarity = "common";

    // 30% chance to be uncommon
  } else if (rarityRoll <= 80) {
    chosenRarity = "uncommon";

    // 12.5% chance to be rare
  } else if (rarityRoll <= 92.5) {
    chosenRarity = "rare";

    // 5% chance to be epic
  } else if (rarityRoll <= 97.5) {
    chosenRarity = "epic";

    // 2.5% chance to be legendary ( = 100% :) )
  } else if (rarityRoll <= 100) {
    chosenRarity = "legendary";
  }

  let chosenRarityCards = await prisma.card.findMany({
    where: {
      rarity: chosenRarity,
      NOT: {
        id: {
          in: alreadyChosenCommonCards.map((card) => card.id),
        },
      },
    },
  });

  const theCardIndex = Math.floor(Math.random() * chosenRarityCards.length);

  return chosenRarityCards[theCardIndex];
}
