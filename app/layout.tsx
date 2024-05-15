import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import React from "react";
import OpeningContextProvider from "@/context/opening-context";
import Navbar from "@/components/navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dada",
  description:
    "Strava athlete could buy boosters with collectible cards and expand his collection by logging more running/cycling activities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <OpeningContextProvider>
          <Navbar />
          <main className="flex min-h-screen flex-col items-center justify-between p-1 sm:p-8">{children}</main>
        </OpeningContextProvider>
      </body>
    </html>
  );
}
