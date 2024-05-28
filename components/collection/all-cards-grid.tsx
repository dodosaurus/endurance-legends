import { compareCardToOwnedCards } from "@/lib/utils";
import { Card } from "@prisma/client";
import AppCardFront from "../app-card/app-card-front";
import AppCardPlaceholder from "./app-card-placeholder";

type AllCardsGridProps = {
  cards: Card[];
  ownedCardsIds: number[];
};
function AllCardsGrid({ cards, ownedCardsIds }: AllCardsGridProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {cards.map((card) => (
        <div key={card.id}>
          {compareCardToOwnedCards(card.id, ownedCardsIds).isOwned && <AppCardFront card={card} />}
          {!compareCardToOwnedCards(card.id, ownedCardsIds).isOwned && (
            <AppCardPlaceholder cardNo={card.id} rarity={card.rarity} />
          )}
        </div>
      ))}
    </div>
  );
}

export default AllCardsGrid;
