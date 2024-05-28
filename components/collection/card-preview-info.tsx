import { Card } from "@prisma/client";

function CardPreviewInfo({ card, numberOfCopies = 1 }: { card: Card; numberOfCopies?: number }) {
  const getRarityColorClass = (rarity: string): string => {
    if (rarity === "uncommon") {
      return "border-emerald-300";
    }
    if (rarity === "rare") {
      return "border-sky-300";
    }
    if (rarity === "epic") {
      return "border-violet-300";
    }
    if (rarity === "legendary") {
      return "border-amber-300";
    }
    return "border-slate-300";
  };

  return (
    <div className={`border-2 rounded-md p-3 bg-white ${getRarityColorClass(card.rarity)}`}>
      {card.rarity === "common" && (
        <article className="flex flex-col gap-2">
          <h3>
            <span className="font-semibold">Name: </span>
            {card.name}
          </h3>
          <p>
            <span className="font-semibold">Country: </span>
            {card.country}
          </p>
          <p>
            <span className="font-semibold">Birth date: </span>
            {card.dateInfo}
          </p>
          <p>
            <span className="font-semibold">Team: </span>
            {card.additionalInfo1}
          </p>
          <p>
            <span className="font-semibold">Weight/height: </span>
            {card.additionalInfo2}
          </p>
          {/* <p>
            <span className="pt-6 font-semibold">Copies owned: </span>
            <span className="text-lg pl-1 font-bold text-cyan-800">{numberOfCopies}</span>
          </p> */}
          <p className="text-xs pt-6">
            <span className="font-semibold">Photo source: </span>
            <a className="text-cyan-700 hover:text-cyan-900" href={card.cardImageSource ? card.cardImageSource : ""}>
              HERE
            </a>
          </p>
        </article>
      )}
      {card.rarity != "common" && (
        <article className="flex flex-col gap-2">
          <h3>
            <span className="font-semibold">Race: </span>
            {card.name}
          </h3>
          <p>
            <span className="font-semibold">Country: </span>
            {card.country}
          </p>
          <p>
            <span className="font-semibold">Date (from 2024): </span>
            {card.dateInfo}
          </p>
          <p>
            <span className="font-semibold">Last winner (from 2024): </span>
            {card.additionalInfo1}
          </p>
          <p>
            <span className="font-semibold">Category: </span>
            {card.additionalInfo2}
          </p>
          {/* <p>
            <span className="pt-6 font-semibold">Copies owned: </span>
            <span className="text-lg pl-1 font-bold text-cyan-800">{numberOfCopies}</span>
          </p> */}
          <p className="text-xs pt-6">
            <span className="font-semibold">Photo source: </span>
            <a className="text-cyan-700 hover:text-cyan-900" href={card.cardImageSource ? card.cardImageSource : ""}>
              HERE
            </a>
          </p>
        </article>
      )}
    </div>
  );
}

export default CardPreviewInfo;
