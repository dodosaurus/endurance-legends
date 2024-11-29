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
          <Button variant="default" className="flex items-center">
            <ChevronLeft className="h-4 w-4" strokeWidth={3} />
            <span className="ml-2 text-lg">Back</span>
          </Button>
        </Link>
      )}
    </>
  );
};

export default BackToDashboard;
