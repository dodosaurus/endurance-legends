import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { verifySession } from "@/server/auth/session";
import { collectionSync } from "@/server/interface/synchronizers";
import Link from "next/link";

export default async function Collection() {
  const { athleteId } = await verifySession();
  const { cards } = await collectionSync(athleteId as number);

  const bgBasedOnCardRarity = (rarity: string): string => {
    if (rarity === "uncommon") {
      return "bg-green-50";
    }
    if (rarity === "rare") {
      return "bg-blue-50";
    }
    if (rarity === "epic") {
      return "bg-purple-50";
    }
    if (rarity === "legendary") {
      return "bg-orange-50";
    }
    return "";
  };

  //not automatically syncing like on dashboard, rather add own button for that

  return (
    <div id="collection" className="flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle>My collection</CardTitle>
          <CardDescription className="flex items-center justify-between">
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
            <TableHead className="hidden lg:table-cell">Coins</TableHead>
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
              <TableRow key={card.id} className={bgBasedOnCardRarity(card.rarity)}>
                <TableCell>
                  <div className="font-medium">{card.name}</div>
                  <div className="text-sm text-muted-foreground">{card.id}</div>
                </TableCell>
                <TableCell className="table-cell">{card.additionalInfo1}</TableCell>
                <TableCell className="hidden sm:table-cell">{card.additionalInfo2}</TableCell>
                <TableCell className="hidden md:table-cell">{card.country}</TableCell>
                <TableCell className="hidden md:table-cell">{card.dateInfo}</TableCell>
                <TableCell className="table-cell">
                  <Badge className="text-xs" variant="secondary">
                    <div className="flex justify-start items-center gap-1">
                      <span>{card.rarity}</span>
                    </div>
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
