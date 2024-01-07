import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import useLoginModal from "./useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedUser, mutate: mutateFetchedUser } = useUser(userId);
  const LoginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const followingIds = currentUser?.followingIds || [];
    return followingIds.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      LoginModal.onOpen();
    }
    try {
      let request;
      if (isFollowing) {
        request = () => axios.delete("/api/follow", { data: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }
      await request();

      mutateCurrentUser();
      mutateFetchedUser();
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }, [
    LoginModal,
    isFollowing,
    userId,
    currentUser,
    mutateCurrentUser,
    mutateFetchedUser,
  ]);
  return { isFollowing, toggleFollow };
};
export default useFollow;
