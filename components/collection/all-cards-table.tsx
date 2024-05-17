import { Card } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { RowWithCard } from "./row-with-card";
import { compareCardToOwnedCards } from "@/lib/utils";

type AllCardsTableProps = {
  cards: Card[];
  ownedCardsIds: number[];
};

function AllCardsTable({ cards, ownedCardsIds }: AllCardsTableProps) {
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
        {cards.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Loading the collection...
            </TableCell>
          </TableRow>
        )}
        {cards.length > 0 &&
          cards.map((card) => (
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

export default AllCardsTable;
