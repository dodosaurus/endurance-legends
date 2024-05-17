import { RowWithCard } from "@/components/collection/row-with-card";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { compareCardToOwnedCards } from "@/lib/utils";
import { verifySession } from "@/server/auth/session";
import { collectionSync } from "@/server/interface/synchronizers";
import Link from "next/link";

export default async function Collection() {
  const { athleteId } = await verifySession();
  const { cards, ownedCardsIds } = await collectionSync(athleteId as number);

  //not automatically syncing like on dashboard, rather add own button for that

  return (
    <div id="collection" className="flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle>My collection</CardTitle>
          <CardDescription className="flex flex-col items-start justify-between gap-5">
            <span>
              Below you can see whole collection and which cards you do own. Get out for a run or ride and earn more!
            </span>
            <Link href="/dashboard">
              <Button variant={"outline"}>Back to dashboard</Button>
            </Link>
          </CardDescription>
        </CardHeader>
      </Card>
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
    </div>
  );
}
