function AppCardLayout({
  children,
  face,
  rarity = "common",
}: {
  children: React.ReactNode;
  face: "front" | "back";
  rarity?: string;
}) {
  const getRarityColorClass = (rarity: string): string => {
    if (rarity === "common") {
      return "";
    } else {
      return `card__${rarity}`;
    }
  };

  return (
    <div
      className={
        "app-card-" +
        face +
        " card__article flex flex-col justify-between items-center rounded-md shadow-md " +
        getRarityColorClass(rarity)
      }
    >
      {children}
    </div>
  );
}

export default AppCardLayout;
