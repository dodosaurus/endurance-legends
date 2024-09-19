import Image from "next/image";
import firstImg from "@/public/images/hero/lp01.png";
import secondImg from "@/public/images/hero/lp02.png";
import thirdImg from "@/public/images/hero/lp03.png";
import fourthImg from "@/public/images/hero/lp04.png";

function LandingPageHero() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-3">
      <Image className="h-[450px] w-[325px] hover:rotate-2 transition ease-in-out duration-500" src={firstImg} placeholder="blur" alt="hero img 1" />
      <Image className="h-[450px] w-[325px] hover:rotate-2 transition ease-in-out duration-500" src={secondImg} placeholder="blur" alt="hero img 2" />
      {/* <Image className="h-[450px] w-[325px] hover:rotate-2 transition ease-in-out duration-500" src={thirdImg} placeholder="blur" alt="hero img 3" />
      <Image className="h-[450px] w-[325px] hover:rotate-2 transition ease-in-out duration-500" src={fourthImg} placeholder="blur" alt="hero img 4" /> */}
    </div>
  );
}

export default LandingPageHero;
