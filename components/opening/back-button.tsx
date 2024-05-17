"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  const onClick = () => {
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <Button onClick={onClick} variant={"secondary"}>
      Back to dashboard
    </Button>
  );
}

export default BackButton;
