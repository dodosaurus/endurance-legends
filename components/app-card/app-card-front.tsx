import { CircleFlag } from "react-circle-flags";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import AppCardLayout from "./app-card-layout";
import type { Card as CardType } from "@prisma/client";
import { getIsoCountryCode } from "@/lib/utils";
import cardImages from "@/lib/card-images";

function AppCardFront({ card }: { card: CardType }) {
  const getRightCountryCodeForFlag = (countryString: string) => {
    //if given string is three chars or lower long just conver it to lowerCase and return
    if (countryString.length <= 3) {
      return countryString.toLowerCase();
    }

    //else call getIsoCountryCode
    return getIsoCountryCode(countryString);
  };

  const getDescContent = () => {
    if (card.rarity !== "common") {
      return (
        <div>
          <span className="font-semibold">Last winner: </span>
          {card.additionalInfo1 || "N/A"}
        </div>
      );
    } else {
      return <p>{card.additionalInfo1}</p>;
    }
  };
  const getRarityColorClass = (rarity: string): string => {
    if (rarity === "uncommon") {
      return "bg-emerald-300";
    }
    if (rarity === "rare") {
      return "bg-sky-300";
    }
    if (rarity === "epic") {
      return "bg-violet-300";
    }
    if (rarity === "legendary") {
      return "bg-amber-300";
    }
    return "bg-slate-300";
  };

  const getTitleFontSize = (title: string): string => {
    if (title.length <= 20) {
      return "text-lg";
    } else if (title.length <= 30) {
      return "text-sm";
    } else {
      return "text-xs";
    }
  };

  const resolveImageImport = (str: keyof typeof cardImages) => {
    return cardImages[str];
  };

  return (
    <AppCardLayout face="front" rarity={card.rarity}>
      <Image
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={resolveImageImport(card.cardImageName as keyof typeof cardImages)}
        alt="app card image"
        placeholder="blur"
        priority
      />
      <Badge
        className={"absolute z-2 top-3 right-3 text-xs pointer-events-none " + getRarityColorClass(card.rarity)}
        variant="secondary"
      >
        <div className="flex justify-start items-center gap-1">
          <span>{card.rarity}</span>
        </div>
      </Badge>
      <Card className="absolute bottom-0 w-full z-10">
        <CardHeader>
          <CardTitle className="flex justify-between items-center gap-2">
            <span>{card.id}</span>
            <div className="flex justify-end items-center gap-3">
              <CircleFlag className="w-6 h-6" countryCode={getRightCountryCodeForFlag(card.country) || ""} />
              <h2 className={getTitleFontSize(card.name)}>{card.name}</h2>
            </div>
          </CardTitle>
          <CardDescription className="flex justify-end items-center">
            <p>{getDescContent()}</p>
          </CardDescription>
        </CardHeader>
        {/* <CardContent>
        <div className="text-xs text-muted-foreground">content goes here</div>
      </CardContent>
      <CardFooter></CardFooter> */}
      </Card>
    </AppCardLayout>
  );
}

export default AppCardFront;
