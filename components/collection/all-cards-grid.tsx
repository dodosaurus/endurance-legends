import { compareCardToOwnedCards } from "@/lib/utils";
import { Card } from "@prisma/client";
import AppCardFront from "../app-card/app-card-front";
import AppCardPlaceholder from "./app-card-placeholder";
import CardPreview from "./card-preview";
import NumberOfCopiesBadge from "./number-of-copies-badge";
import NewCardBadge from "./new-card-badge";

type AllCardsGridProps = {
  cards: Card[];
  ownedCardsIds: number[];
  newCardsIds: number[];
};
function AllCardsGrid({ cards, ownedCardsIds, newCardsIds }: AllCardsGridProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {cards.map((card) => (
        <div key={card.id}>
          {compareCardToOwnedCards(card.id, ownedCardsIds).isOwned && (
            <div className="relative hover:rotate-0 xl:hover:rotate-2 transition ease-in-out duration-500 cursor-pointer">
              <NumberOfCopiesBadge numberOfCopies={compareCardToOwnedCards(card.id, ownedCardsIds).occurences} />
              {newCardsIds.includes(card.id) && <NewCardBadge />}
              <CardPreview children={<AppCardFront card={card} />} card={card} />
            </div>
          )}
          {!compareCardToOwnedCards(card.id, ownedCardsIds).isOwned && (
            <div>
              <AppCardPlaceholder cardNo={card.id} rarity={card.rarity} />
            </div>
          )}
          {/* <AppCardFront card={card} /> */}
        </div>
      ))}
    </div>
  );
}

export default AllCardsGrid;
