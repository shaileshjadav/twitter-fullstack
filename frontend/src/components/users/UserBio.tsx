import { BiCalendar } from "react-icons/bi";

import { format } from "date-fns";
import { useMemo } from "react";
import Button from "../Button";
import useEditModal from "../..//hooks/useEditModal";
import useFollow from "../../hooks/useFollow";
import useAuth from "../../hooks/useAuth";

interface UserBioProps {
  userId: string;
  userData: {
    name: string;
    username: string;
    bio: string;
    createAt?: string;
    isFollowing: boolean;
    followersCount?: number;
    followingCount?: number;
  };
}
const UserBio: React.FC<UserBioProps> = ({ userId, userData }) => {
  const { user: currentUser } = useAuth();

  const editModal = useEditModal();
  const { toggleFollow } = useFollow(userId);

  const createAt = useMemo(() => {
    if (!userData?.createAt) {
      return null;
    }

    return format(new Date(userData.createAt), "MMMM yyyy");
  }, [userData?.createAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label="Edit Profile" onClick={editModal.onOpen} />
        ) : (
          <Button
            label={userData.isFollowing ? "Unfollow" : "Follow"}
            onClick={() => toggleFollow(userData.isFollowing)}
            secondary={!userData.isFollowing}
            outline={userData.isFollowing}
          />
        )}
      </div>

      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">{userData?.name}</p>
          <p className="text-md text-neutral-500">@{userData?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{userData?.bio}</p>
          <div
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          "
          >
            <BiCalendar size={24} />
            <p>Joined {createAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{userData.followingCount}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{userData.followersCount}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserBio;
