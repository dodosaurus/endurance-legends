"use client";

import { useState } from "react";
import AppCardBack from "./app-card-back";
import AppCardFront from "./app-card-front";
import type { Card as CardType } from "@prisma/client";

function AppCard({ card }: { card: CardType }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(true);
  };

  return (
    <div onClick={handleClick} className="app-card-container cursor-pointer hover:rotate-0 xl:hover:rotate-2 transition ease-in-out duration-500">
      <div className="app-card">
        {!isFlipped && <AppCardBack rarity={card.rarity} />}
        {isFlipped && <AppCardFront card={card} />}
      </div>
    </div>
  );
}

export default AppCard;
