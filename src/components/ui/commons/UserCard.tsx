import { constants } from "@/lib/constants";
import Image from "next/image";
const isDemoMode = constants.demoMode;

const UserCard = ({ user }: { user: any }) => (
  <div>
    <div className="flex items-center">
      <div className="h-11 w-11 flex-shrink-0">
        <Image
          width={44}
          height={44}
          className="h-11 w-11 rounded-full"
          src={user.avatar ?? "/assets/img/avatar.png"}
          alt=""
        />
      </div>
      <div className="ml-4">
        <div className="font-medium  ">
          {user.name} ({user.id})
        </div>
        <div className="mt-1 text-gray-500">
          {!isDemoMode ? user.email : "In demo mode, email is hidden, :)"}
        </div>
      </div>
    </div>
  </div>
);

export default UserCard;
