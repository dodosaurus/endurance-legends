import { getUserForProfileSegment, logout, synchronize } from "@/server/interface/actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import InfoTimes from "../dashboard/panel-cards/subparts/info-times";
import LogoutForm from "../dashboard/panel-cards/subparts/logout-form";
import SynchronizeForm from "../dashboard/panel-cards/subparts/synchronize-form";

async function ProfileSegment() {
  const user = await getUserForProfileSegment();

  return (
    <div>
      {user ? (
        <div className="flex justify-between items-center gap-5">
          <Link href="/collection">
            <Button className="bg-cyan-500 hover:bg-cyan-500/80 font-semibold w-32">My collection</Button>
          </Link>
          <Dialog>
            <DialogTrigger>
              <Avatar>
                <AvatarImage src={user.profile} alt="avatar of user" />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent>
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
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                <a target="_blank" href={`https://www.strava.com/athletes/${user.athleteId}`} rel="noopener noreferrer">
                  <Button className="bg-cyan-500 hover:bg-cyan-500/80 font-semibold w-32">View on Strava</Button>
                </a>
                <SynchronizeForm synchronize={synchronize} />
                <LogoutForm logout={logout} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div id="no_user_loaded"></div>
      )}
    </div>
  );
}

export default ProfileSegment;
