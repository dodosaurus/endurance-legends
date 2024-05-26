function AppCardLayout({
  children,
  face,
  rarity = "common",
}: {
  children: React.ReactNode;
  face: "front" | "back";
  rarity?: string;
}) {
  const getCardRarityColorClass = (rarity: string): string => {
    if (rarity === "uncommon") {
      return `card__${rarity} shadow-2xl shadow-emerald-500`;
    }
    if (rarity === "rare") {
      return `card__${rarity} shadow-2xl shadow-sky-500`;
    }
    if (rarity === "epic") {
      return `card__${rarity} shadow-2xl shadow-violet-500`;
    }
    if (rarity === "legendary") {
      return `card__${rarity} shadow-2xl shadow-amber-500`;
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
