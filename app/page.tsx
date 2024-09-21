import Footer from "@/components/footer";
import LandingPageHero from "@/components/landing-page/landing-page-hero";
import SignupCard from "@/components/signup-card";

export default function Home() {
  return (
    <div id="landingPage" className="flex flex-col gap-16 sm:gap-20 md:gap-24 w-full">
      <section className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16">
        <div className="py-5 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary">
            Here your fitness meets <span className="text-cyan-500">rewards</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl max-w-prose text-primary">
            Welcome to Endurance Vault. Train, log Strava activities, earn coins and buy card packs to expand your{" "}
            <span className="font-bold text-amber-500">World Tour cycling</span> collection.
          </p>
        </div>
        <SignupCard />
      </section>
      <section className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16">
        <LandingPageHero />
        <h1 className="max-w-[1000px] text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary">
          Unlock your potential by motivating yourself and your friends buy acquiring more common,{" "}
          <span className="text-green-600">uncommon</span>, <span className="text-sky-600">rare</span>,{" "}
          <span className="text-violet-400">epic</span> and <span className="text-amber-600">legendary</span> cards!
        </h1>
      </section>
      <Footer />
    </div>
  );
}
