"use client";

import { Card } from "@prisma/client";
import { useState, useCallback, useEffect } from "react";
import { OpenedCardsCarousel } from "./opened-cards-carousel";
import AppCard from "./app-card";

export const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, []);

  return targetReached;
};

function OpenedCards({ newestCards }: { newestCards: Card[] }) {
  const isBreakpoint = useMediaQuery(1380);

  return (
    <div className="flex justify-center items-center gap-6">
      {isBreakpoint && <OpenedCardsCarousel cards={newestCards} />}
      {!isBreakpoint && (
        <>
          <AppCard card={newestCards[0]} />
          <AppCard card={newestCards[1]} />
          <AppCard card={newestCards[2]} />
          <AppCard card={newestCards[3]} />
        </>
      )}
    </div>
  );
}

export default OpenedCards;
