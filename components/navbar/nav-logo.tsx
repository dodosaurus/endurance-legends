"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BackToDashboard from "./back-to-dashboard";

const NavLogo = () => {
  const pathname = usePathname();
  const showBackButton = ["/collection", "/opening"].includes(pathname);

  return showBackButton ? (
    <BackToDashboard />
  ) : (
    <Link href="/" className="flex z-40 font-semibold text-lg sm:text-xl">
      endurance<span className="text-cyan-600">legends</span>
    </Link>
  );
};

export default NavLogo; 
