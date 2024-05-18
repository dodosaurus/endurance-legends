function AppCardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[450px] w-[325px] flex flex-col justify-end border rounded-lg shadow-lg">
      {children}
    </div>
  );
}

export default AppCardLayout;
