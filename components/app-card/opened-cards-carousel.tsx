import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { Card as CardType } from "@prisma/client";
import AppCard from "./app-card";

export function OpenedCardsCarousel({ cards }: { cards: CardType[] }) {
  return (
    <Carousel
      className="w-full max-w-[330px]"
      opts={{
        containScroll: "keepSnaps",
      }}
    >
      <CarouselContent>
        {cards.map((_, index) => (
          <CarouselItem key={index}>
            <AppCard card={cards[index]} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
