import { compareCardToOwnedCards } from "@/lib/utils";
import { Card } from "@prisma/client";
import AppCardFront from "../app-card/app-card-front";

type OwnedCardsGridProps = {
  cards: Card[];
  ownedCardsIds: number[];
};
function OwnedCardsGrid({ cards, ownedCardsIds }: OwnedCardsGridProps) {
  const ownedCards = cards.filter((card) => compareCardToOwnedCards(card.id, ownedCardsIds).isOwned);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {ownedCards.map((card) => (
        <div key={card.id}>
          <AppCardFront card={card} />
        </div>
      ))}
    </div>
  );
}

export default OwnedCardsGrid;
