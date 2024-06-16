import { CircleFlag } from "react-circle-flags";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import AppCardLayout from "./app-card-layout";
import type { Card as CardType } from "@prisma/client";
import { getIsoCountryCode } from "@/lib/utils";
import cardImages from "@/lib/card-images";
import TopTenBadge from "./top-ten-badge";

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
      return "bg-emerald-300 dark:bg-emerald-600";
    }
    if (rarity === "rare") {
      return "bg-sky-300 dark:bg-sky-600";
    }
    if (rarity === "epic") {
      return "bg-violet-300 dark:bg-violet-600";
    }
    if (rarity === "legendary") {
      return "bg-amber-300 dark:bg-amber-600";
    }
    return "bg-slate-300 dark:bg-slate-600";
  };

  const getRarityTextColorClass = (rarity: string): string => {
    if (rarity === "uncommon") {
      return "text-emerald-600 dark:text-emerald-300";
    }
    if (rarity === "rare") {
      return "text-sky-600 dark:text-sky-300";
    }
    if (rarity === "epic") {
      return "text-violet-600 dark:text-violet-300";
    }
    if (rarity === "legendary") {
      return "text-amber-600 dark:text-amber-300";
    }
    return "";
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
    <AppCardLayout face="front" rarity={card.rarity} shadowIntensity="lg">
      <Image
        className="absolute top-0 left-0 h-[375px] object-cover z-0"
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
      {card.id <= 10 && <TopTenBadge />}
      <Card className="absolute bottom-0 w-full z-10">
        <CardHeader>
          <CardTitle className="flex justify-between items-center gap-2">
            <span className={getRarityTextColorClass(card.rarity)}>{card.id}</span>
            <div className="flex justify-end items-center gap-3">
              <CircleFlag className="w-6 h-6" countryCode={getRightCountryCodeForFlag(card.country) || ""} />
              <h2 className={getTitleFontSize(card.name)}>{card.name}</h2>
            </div>
          </CardTitle>
          <CardDescription className="flex justify-end items-center">
            <span>{getDescContent()}</span>
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
