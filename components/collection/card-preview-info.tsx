import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Card as CardType } from "@prisma/client";

function CardPreviewInfo({ card, numberOfCopies = 1 }: { card: CardType; numberOfCopies?: number }) {

  return (
    <>
      {card.rarity === "common" && (
        <Card>
          <CardHeader>
            <CardTitle>{card.name}</CardTitle>
            <CardDescription>{card.additionalInfo1}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <span className="font-semibold">Country: </span>
              {card.country}
            </p>
            <p>
              <span className="font-semibold">Birth date: </span>
              {card.dateInfo}
            </p>
            <p>
              <span className="font-semibold">Weight/height: </span>
              {card.additionalInfo2}
            </p>
            <p>
              <span className="pt-6 font-semibold">Copies owned: </span>
              <span className="text-lg pl-1 font-bold text-cyan-800">{numberOfCopies}</span>
            </p>
          </CardContent>
          <CardFooter>
            <p>
              <span className="font-semibold">Photo source: </span>
              <a className="text-cyan-700 hover:text-cyan-900" href={card.cardImageSource ? card.cardImageSource : ""}>
                HERE
              </a>
            </p>
          </CardFooter>
        </Card>
      )}
      {card.rarity != "common" && (
        <Card>
          <CardHeader>
            <CardTitle>{card.name}</CardTitle>
            <CardDescription>{card.country}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <span className="font-semibold">Date (from 2024): </span>
              {card.dateInfo}
            </p>
            <p>
              <span className="font-semibold">Last winner (from 2024): </span>
              {card.additionalInfo1 || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Category: </span>
              {card.additionalInfo2}
            </p>
            <p>
              <span className="pt-6 font-semibold">Copies owned: </span>
              <span className="text-lg pl-1 font-bold text-cyan-800">{numberOfCopies}</span>
            </p>
          </CardContent>
          <CardFooter>
            <p>
              <span className="font-semibold">Photo source: </span>
              <a className="text-cyan-700 hover:text-cyan-900" href={card.cardImageSource ? card.cardImageSource : ""}>
                HERE
              </a>
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default CardPreviewInfo;
