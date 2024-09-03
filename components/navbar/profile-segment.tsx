import { getUserForProfileSegment, logout, synchronize } from "@/server/interface/actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import InfoTimes from "../dashboard/panel-cards/subparts/info-times";
import LogoutForm from "../dashboard/panel-cards/subparts/logout-form";
import SynchronizeForm from "../dashboard/panel-cards/subparts/synchronize-form";
import { ModeToggle } from "./mode-toggle";
import Footer from "../footer";
import { StravaIcon } from "../strava-icon";
import HowToModal from "../how-to-modal";

async function ProfileSegment() {
  const user = await getUserForProfileSegment();

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-2 sm:gap-5">
          <div className="hidden sm:block">
            <HowToModal triggerVariant="secondary" />
          </div>
          <Dialog>
            <DialogTrigger>
              <Avatar>
                <AvatarImage src={user.profile} alt="avatar of user" />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-3xl max-h-[90vh] overflow-y-auto mt-16 sm:mt-0">
              <DialogHeader>
                <div className="flex justify-start items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.profile} alt="avatar of user" />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <DialogTitle>
                    {user.name} <span className="font-normal text-sm"> ({user.username})</span>
                  </DialogTitle>
                </div>
                <InfoTimes lastStravaRefresh={user.lastStravaRefresh} inAppSince={user.inAppSince} />
              </DialogHeader>
              <div className="flex flex-col justify-between items-center gap-2">
                <div className="sm:hidden w-full flex justify-center mb-2">
                  <HowToModal triggerVariant="secondary" />
                </div>
                <a target="_blank" href={`https://www.strava.com/athletes/${user.athleteId}`} rel="noopener noreferrer">
                  <Button className="bg-cyan-500 hover:bg-cyan-500/80 font-semibold w-32">View on Strava</Button>
                </a>
                <SynchronizeForm synchronize={synchronize} />
                <LogoutForm logout={logout} />
                <ModeToggle />
              </div>
              <Footer />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <a
          className={buttonVariants({ variant: "ghost" })}
          target="_blank"
          href={`https://www.strava.com/`}
        >
          <span className="hidden xs:inline-block text-xs mr-1">Powered by</span>
          <StravaIcon />
        </a>
      )}
    </div>
  );
}

export default ProfileSegment;
