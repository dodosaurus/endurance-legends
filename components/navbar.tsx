import Link from "next/link";
import ProfileSegment from "./navbar/profile-segment";
import { ModeToggle } from "./navbar/mode-toggle";
import NavLogo from "./navbar/nav-logo";

const Navbar = () => {
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full bg-white/75 dark:bg-slate-950/75 backdrop-blur-lg shadow-md">
      <div className="flex h-14 items-center justify-between px-2 sm:px-5">
        <NavLogo />
        <ProfileSegment />
        {/* <ModeToggle /> */}
      </div>
    </nav>
  );
};

export default Navbar;
