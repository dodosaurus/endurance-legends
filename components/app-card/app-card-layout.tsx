function AppCardLayout({ children, rarity = "common" }: { children: React.ReactNode; rarity?: string }) {
  const getRarityColorClass = (rarity: string): string => {
    if (rarity === "common") {
      return "";
    } else {
      return `card__${rarity}`;
    }
  };

  return (
    <div className={"card__article flex flex-col justify-between items-center rounded-md shadow-md " + getRarityColorClass(rarity)}>
      {children}
    </div>
  );
}

export default AppCardLayout;
