import Footer from "@/components/footer";
import LandingPageHero from "@/components/landing-page/landing-page-hero";
import SignupCard from "@/components/signup-card";

export default function Home() {
  return (
    <div id="landingPage" className="flex-grow flex flex-col gap-10 w-full">
      <section className="flex flex-col justify-between items-center md:gap-20 gap-2">
        <div className="py-5 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl">
            Here your fitness meets <span className="text-cyan-500">rewards</span>
          </h1>
          <p className="mt-6 text-xl max-w-prose text-primary">
            Welcome to Endurance Vault. Train, log Strava activities, earn coins and buy card packs to expand your{" "}
            <span className="font-bold text-amber-500">World Tour cycling</span> collection.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <SignupCard />
        </div>
      </section>
      <section className="flex flex-col justify-center items-center my-5 gap-10 pt-10">
        <LandingPageHero />
        <h1 className="max-w-[1000px] text-center text-3xl font-bold tracking-tight text-primary sm:text-4xl md:mt-5">
          Unlock your potential by motivating yourself and your friends buy acquiring more common,{" "}
          <span className="text-green-600">uncommon</span>, <span className="text-sky-600">rare</span>,{" "}
          <span className="text-violet-400">epic</span> and <span className="text-amber-600">legendary</span> cards!
        </h1>
      </section>
      <Footer />
    </div>
  );
}
