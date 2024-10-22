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
          <Button variant="secondary" className="flex items-center">
            <ChevronLeft className="h-5 w-5" strokeWidth={3} />
            <span className="ml-3">Back to Dashboard</span>
          </Button>
        </Link>
      )}
    </>
  );
};

export default BackToDashboard;
