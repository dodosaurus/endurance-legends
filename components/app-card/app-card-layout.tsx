function AppCardLayout({ children, rarity = "common" }: { children: React.ReactNode; rarity?: string }) {
  return <div className="relative h-[450px] w-[325px] flex flex-col justify-end rounded-md shadow-md">{children}</div>;
}

export default AppCardLayout;
