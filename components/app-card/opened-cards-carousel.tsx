import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { Card as CardType } from "@prisma/client";
import AppCardFront from "./app-card-front";

export function OpenedCardsCarousel({ cards }: { cards: CardType[] }) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {cards.map((_, index) => (
          <CarouselItem key={index}>
            <AppCardFront card={cards[index]} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
