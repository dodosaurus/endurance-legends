function AppCardLayout({ children, rarity = "common" }: { children: React.ReactNode; rarity?: string }) {
  return <div className="card__article flex flex-col justify-between items-center rounded-md shadow-md">{children}</div>;
}

export default AppCardLayout;
