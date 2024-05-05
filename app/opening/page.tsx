import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableRow } from "@/components/ui/table";
import Link from "next/link";

export async function Opening() {
  const acquired_cards = [
    {
      id: 9,
      uuid: "99c05235-493e-460c-9355-7db8e5e8772c",
      collectionId: 1,
      rarity: "common",
      name: "AYUSO Juan",
      country: "Spain",
      dateInfo: "16/09/2002",
      additionalInfo1: "UAE Team Emirates",
      additionalInfo2: "65 kg / 1.83 m",
      extendedInfo: "",
    },
    {
      id: 76,
      uuid: "ba99217f-8019-4c6f-bdab-cb2c3365ba00",
      collectionId: 1,
      rarity: "common",
      name: "BERNAL Egan",
      country: "Colombia",
      dateInfo: "13/01/1997",
      additionalInfo1: "INEOS Grenadiers",
      additionalInfo2: "60 kg / 1.75 m",
      extendedInfo: "",
    },
    {
      id: 77,
      uuid: "c7adab0e-df23-443a-a8ab-f710899a63a5",
      collectionId: 1,
      rarity: "common",
      name: "GROSSSCHARTNER Felix",
      country: "Austria",
      dateInfo: "23/12/1993",
      additionalInfo1: "UAE Team Emirates",
      additionalInfo2: "64 kg / 1.84 m",
      extendedInfo: "",
    },
    {
      id: 125,
      uuid: "b1d63326-5f19-471d-b30d-3c09a48c21f3",
      collectionId: 1,
      rarity: "legendary",
      name: "Tour de France",
      country: "FR",
      dateInfo: "29.06 - 21.07",
      additionalInfo1: "",
      additionalInfo2: "2.UWT - Grand Tour",
      extendedInfo: "",
    },
  ];

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

  return (
    <div id="collection" className="flex flex-col gap-2">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>CONGRATULATIONS! You just opened 1 pack :)</CardTitle>
          <CardDescription className="py-5 text-center">
            <span>A list of acquired cards.</span>
          </CardDescription>
          <CardContent>
            <Table>
              <TableCaption>
                <Link href="/dashboard">
                  <Button variant={"outline"}>Back to dashboard</Button>
                </Link>
              </TableCaption>
              <TableBody>
                {acquired_cards.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Opening the pack...
                    </TableCell>
                  </TableRow>
                )}
                {acquired_cards.length > 0 &&
                  acquired_cards.map((card) => (
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
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}

export default Opening;
