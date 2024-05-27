"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type LoaderButtonProps = {
  text: string;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "tertiary" | "ghost" | null | undefined;
};

function LoaderButton({ text, variant = "secondary" }: LoaderButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} variant={variant} className="w-32">
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : text}
    </Button>
  );
}

export default LoaderButton;
