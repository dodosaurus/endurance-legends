import { compareCardToOwnedCards, sortCardsByRarity } from "@/lib/utils";
import { Card } from "@prisma/client";
import AppCardFront from "../app-card/app-card-front";
import CardPreview from "./card-preview";
import { Badge } from "../ui/badge";

type OwnedCardsGridProps = {
  cards: Card[];
  ownedCardsIds: number[];
};
function OwnedCardsGrid({ cards, ownedCardsIds }: OwnedCardsGridProps) {
  const ownedCards = cards.filter((card) => compareCardToOwnedCards(card.id, ownedCardsIds).isOwned);

  //sort by rarity (common, uncommon, rare, epic, legendary)
  // ownedCards.sort((a, b) => {
  //   return sortCardsByRarity(a, b);
  // });

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {ownedCards.map((card) => (
        <div
          key={card.id}
          className="relative hover:rotate-0 xl:hover:rotate-2 transition ease-in-out duration-500 cursor-pointer"
        >
          <Badge
            className="absolute -top-1 -left-1 z-10 text-lg font-bold text-cyan-800 bg-cyan-100 hover:bg-cyan-100"
            variant="secondary"
          >
            x {compareCardToOwnedCards(card.id, ownedCardsIds).occurences}
          </Badge>
          <CardPreview children={<AppCardFront card={card} />} card={card} />
        </div>
      ))}
    </div>
  );
}

export default OwnedCardsGrid;
