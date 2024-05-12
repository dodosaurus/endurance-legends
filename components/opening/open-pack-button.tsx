"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

function OpenPackButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button
      disabled={pending}
      className="border-purple-500 border-4inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 bg-purple-500 hover:bg-purple-500/80 font-semibold w-32"
    >
      {pending ? <Loader2 className="h-4 w-4 ml-5 animate-spin" /> : "Open pack"}
    </Button>
  );
}

export default OpenPackButton;
