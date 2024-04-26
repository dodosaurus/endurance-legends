"use client";

import React from "react";
import { Button } from "../ui/button";

type LogoutButtonProps = {
  logout: () => void;
};

function LogoutButton({ logout }: LogoutButtonProps) {
  return (
    <form action={logout}>
      <Button className="bg-purple-500 hover:bg-purple-500/80 font-semibold">Logout</Button>
    </form>
  );
}

export default LogoutButton;
