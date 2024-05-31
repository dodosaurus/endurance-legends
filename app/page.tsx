import LoginCard from "@/components/login-card";
import SignupCard from "@/components/signup-card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

// login page only

export default function Home() {
  return (
    <div id="landingPage" className="flex flex-col md:flex-row justify-between items-center md:gap-10 gap-2">
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-5xl md:text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Here your fitness meets the <span className="text-cyan-600">real rewards</span>
        </h1>
        <p className="mt-6 text-lg max-w-prose text-primary">
          Welcome to Endurance Vault. Train, log Strava activities, earn coins and buy card packs to expand your <span className="font-bold">World Tour cycling</span> collection.
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
    </div>
  );
}
