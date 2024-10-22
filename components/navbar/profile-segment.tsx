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
import Link from "next/link";
import BackToDashboard from "./back-to-dashboard";

async function ProfileSegment() {
  const user = await getUserForProfileSegment();

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-2 sm:gap-5">
          {/* <BackToDashboard /> */}
          <Dialog>
            <DialogTrigger>
              <Avatar>
                <AvatarImage src={user.profile} alt="avatar of user" />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="text-center">
                <div className="flex flex-col items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.profile} alt="avatar of user" />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <DialogTitle className="text-center text-lg font-semibold text-orange-500 hover:text-orange-500/80">
                    <a
                      href={`https://www.strava.com/athletes/${user.athleteId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.name} <span className="font-normal text-sm"> ({user.username})</span>
                    </a>
                  </DialogTitle>
                  <InfoTimes lastStravaRefresh={user.lastStravaRefresh} inAppSince={user.inAppSince} />
                </div>
              </DialogHeader>
              <div className="flex flex-col justify-between items-center gap-2">
                <HowToModal triggerVariant="secondary" />
                <SynchronizeForm synchronize={synchronize} />
                <LogoutForm logout={logout} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <HowToModal triggerVariant="secondary" />
      )}
    </div>
  );
}

export default ProfileSegment;
