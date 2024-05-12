import { Card } from "@prisma/client";
import prisma from "./db/db";
import { PACK_PRICE, PACK_SIZE } from "@/lib/constants";
import { createTransaction } from "./db/queries";

export async function generateAssignmentOfNewCards(athleteId: number): Promise<{ chosenCards: number[] }> {
  const cardIds: number[] = [];

  //generate random card acquirement - 3 common + 1 higher rarity (uncommon, rare, epic, legendary)

  //generate three random common cards, each one should be unique
  const commonCards = await prisma.card.findMany({
    where: {
      rarity: "common",
    },
  });
  const commonCardIds = commonCards.map((card) => card.id);
  for (let i = 0; i < 3; i++) {
    const randomCardIndex = Math.floor(Math.random() * commonCardIds.length);
    const randomCardId = commonCardIds[randomCardIndex];
    cardIds.push(randomCardId);
    commonCardIds.splice(randomCardIndex, 1);
  }

  //generate one random higher rarity card
  const rarityWeights = {
    uncommon: 4,
    rare: 3,
    epic: 2,
    legendary: 1,
  };

  const weightedRarities = Object.entries(rarityWeights).flatMap(([rarity, weight]) => Array(weight).fill(rarity));
  const randomIndex = Math.floor(Math.random() * weightedRarities.length);
  const higherRarity = weightedRarities[randomIndex];

  const higherRarityCards = await prisma.card.findMany({
    where: {
      rarity: higherRarity,
    },
  });

  const randomHigherRarityCardIndex = Math.floor(Math.random() * higherRarityCards.length);
  const higherRarityCard = higherRarityCards[randomHigherRarityCardIndex];

  //master collection is constant, so this always will be returning card, this is just for TS
  if (!higherRarityCard) {
    throw new Error("No higher rarity card found.");
  }

  cardIds.push(higherRarityCard.id);

  return {
    chosenCards: cardIds,
  };
}

export async function assignNewCardSetToOwner(athleteId: number, cardIds: number[]): Promise<Card[]> {
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

  const alreadyOwnedCards = user.ownedCards;

  //we we need to create ownedCards assignemnt on our user, but if card is already owned we will raise the numberOfCopies on it
  const newOwnedCards = cardIds.map((cardId) => {
    const alreadyOwnedCard = alreadyOwnedCards.find((ownedCard) => ownedCard.cardId === cardId);
    if (alreadyOwnedCard) {
      return {
        cardId,
        numberOfCopies: alreadyOwnedCard.numberOfCopies + 1,
      };
    } else {
      return {
        cardId,
        numberOfCopies: 1,
      };
    }
  });

  //unsure if this will update existing owned card numberOfCopies
  const newCollectedCardsCount = user.collectedCards + PACK_SIZE;
  await prisma.user.update({
    where: {
      athleteId,
    },
    data: {
      ownedCards: {
        create: newOwnedCards,
      },
      collectedCards: newCollectedCardsCount,
      lastOpenedPack: cardIds,
    },
  });

  //get 4 card objects from Card table by cardIds
  const toReturnCards = await prisma.card.findMany({
    where: {
      id: {
        in: cardIds,
      },
    },
  });

  return toReturnCards;
}
