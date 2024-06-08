import LandingPageHero from "@/components/landing-page/landing-page-hero";
import LoginCard from "@/components/login-card";
import SignupCard from "@/components/signup-card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div id="landingPage" className="flex flex-col gap-10 h-full">
      <section className="flex flex-col md:flex-row justify-between items-center md:gap-20 gap-2">
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Where your fitness meets the <span className="text-cyan-600">real rewards</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-primary">
            Welcome to Endurance Vault. Train, log Strava activities, earn coins and buy card packs to expand your{" "}
            <span className="font-bold">World Tour cycling</span> collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="#" className={buttonVariants()}>
              How it works
            </Link>
            <Button variant="ghost">Open source codebase &rarr;</Button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <SignupCard />
          <LoginCard />
        </div>
      </section>
      <section className="flex flex-col justify-center items-center my-5 gap-10">
        <LandingPageHero />
        <h1 className="max-w-[1000px] text-center text-3xl font-bold tracking-tight md:text-gray-900 text-gray-300 sm:text-4xl md:mt-5">
          Unlock your potential by motivating yourself and your friends buy acquiring more <span className="text-gray-300">common</span>,{" "}
          <span className="text-green-600">uncommon</span>, <span className="text-sky-600">rare</span>,{" "}
          <span className="text-violet-500">epic</span> and <span className="text-amber-600">legendary</span>{" "}
           cards!
        </h1>
      </section>
    </div>
  );
}
