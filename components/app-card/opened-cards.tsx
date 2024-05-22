import { Card } from "@prisma/client";
import AppCardFront from "./app-card-front";
import { useState, useCallback, useEffect } from "react";
import { OpenedCardsCarousel } from "./opened-cards-carousel";

const useMediaQuery = (width: number) => {
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

function OpenedCards({ assignedCards }: { assignedCards: Card[] }) {
  const isBreakpoint = useMediaQuery(1400);

  return (
    <div className="flex justify-center items-center gap-6">
      {" "}
      {isBreakpoint && <OpenedCardsCarousel cards={assignedCards} />}
      {!isBreakpoint && (
        <>
          <AppCardFront card={assignedCards[0]} />
          <AppCardFront card={assignedCards[1]} />
          <AppCardFront card={assignedCards[2]} />
          <AppCardFront card={assignedCards[3]} />
        </>
      )}
    </div>
  );
}

export default OpenedCards;
