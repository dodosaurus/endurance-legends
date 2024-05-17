import { getUserForProfileSegment } from "@/server/interface/actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";

async function ProfileSegment() {
  const user = await getUserForProfileSegment();

  return (
    <div>
      {user ? (
        <div className="flex justify-between items-center gap-5">
          <Link href="/collection">
            <Button className="bg-cyan-500 hover:bg-cyan-500/80 font-semibold w-32">My collection</Button>
          </Link>
          <Avatar>
            <AvatarImage src={user.profile} alt="avatar of user" />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <p>No user loaded</p>
      )}
    </div>
  );
}

export default ProfileSegment;
