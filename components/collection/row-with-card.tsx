import { Card } from "@prisma/client";
import { TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import CardPreview from "./card-preview";
import { getRarityColorClass } from "@/lib/utils";

export function RowWithCard({ card, owned, noOfCopies }: { card: Card; owned: boolean; noOfCopies: number }) {
  return (
    <>
      {owned ? (
        <TableRow key={card.id} className={"bg-" + getRarityColorClass(card.rarity, "100") + " pointer-events-none"}>
          <TableCell>
            <div className="font-medium">{card.name}</div>
            <div className="text-sm text-muted-foreground">{card.id}</div>
          </TableCell>
          <TableCell className="hidden sm:table-cell">{card.additionalInfo1}</TableCell>
          <TableCell className="hidden md:table-cell">{card.additionalInfo2}</TableCell>
          <TableCell className="hidden md:table-cell">{card.country}</TableCell>
          <TableCell className="hidden md:table-cell">{card.dateInfo}</TableCell>
          <TableCell className="hidden sm:table-cell">
            <Badge className="text-xs" variant="secondary">
              <div className="flex justify-start items-center gap-1">
                <span>{card.rarity}</span>
              </div>
            </Badge>
          </TableCell>
          <TableCell className="table-cell font-semibold text-center">x {noOfCopies}</TableCell>
          <TableCell className="table-cell">
            <CardPreview card={card} />
          </TableCell>
        </TableRow>
      ) : (
        <TableRow className="pointer-events-none">
          <TableCell className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">{card.id}</div>
            <span className="text-sm text-muted-foreground">Card not owned</span>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
