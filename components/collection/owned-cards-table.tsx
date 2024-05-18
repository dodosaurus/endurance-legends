import { Card } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { RowWithCard } from "./row-with-card";
import { compareCardToOwnedCards } from "@/lib/utils";

type OwnedCardsTableProps = {
  cards: Card[];
  ownedCardsIds: number[];
};

function OwnedCardsTable({ cards, ownedCardsIds }: OwnedCardsTableProps) {
  const ownedCards = cards.filter((card) => compareCardToOwnedCards(card.id, ownedCardsIds).isOwned);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Card name</TableHead>
          <TableHead className="table-cell">Info 1</TableHead>
          <TableHead className="hidden sm:table-cell">Info 2</TableHead>
          <TableHead className="hidden md:table-cell">Country of origin</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead className="hidden lg:table-cell">Rarity</TableHead>
          <TableHead className="table-cell">Number of copies</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ownedCards.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              You don't own any cards yet. Go out and earn some!
            </TableCell>
          </TableRow>
        )}
        {ownedCards.length > 0 &&
          ownedCards.map((card) => (
            <RowWithCard
              key={card.id}
              card={card}
              owned={compareCardToOwnedCards(card.id, ownedCardsIds).isOwned}
              noOfCopies={compareCardToOwnedCards(card.id, ownedCardsIds).occurences}
            />
          ))}
      </TableBody>
    </Table>
  );
}

export default OwnedCardsTable;
