function AppCardLayout({
  children,
  face,
  rarity = "common",
  shadowIntensity = "2xl",
}: {
  children: React.ReactNode;
  face: "front" | "back";
  rarity?: string;
  shadowIntensity?: string;
}) {
  const getCardRarityColorClass = (rarity: string): string => {
    if (rarity === "uncommon") {
      return `card__${rarity} shadow-${shadowIntensity} shadow-emerald-500`;
    }
    if (rarity === "rare") {
      return `card__${rarity} shadow-${shadowIntensity} shadow-sky-500`;
    }
    if (rarity === "epic") {
      return `card__${rarity} shadow-${shadowIntensity} shadow-violet-500`;
    }
    if (rarity === "legendary") {
      return `card__${rarity} shadow-${shadowIntensity} shadow-amber-500`;
    }
    return "shadow-md";
  };

  return (
    <div
      className={
        "app-card-" +
        face +
        " card__article flex flex-col justify-between items-center rounded-md " +
        getCardRarityColorClass(rarity)
      }
    >
      {children}
    </div>
  );
}

export default AppCardLayout;
