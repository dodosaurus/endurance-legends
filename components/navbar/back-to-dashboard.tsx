"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

const BackToDashboard = () => {
  const pathname = usePathname();

  const showBackButton = ["/collection", "/opening"].includes(pathname);
  return (
    <>
      {showBackButton && (
        <Link href="/dashboard">
          <Button variant="secondary" size="icon">
            <ChevronLeft className="h-4 w-4" stroke-width={3} />
          </Button>
        </Link>
      )}
    </>
  );
};

export default BackToDashboard;
