"use client";

import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

function LoaderButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} variant={"secondary"} className="w-32">
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : text}
    </Button>
  );
}

export default LoaderButton;
