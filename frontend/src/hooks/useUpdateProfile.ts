import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import apiSecure from "../libs/axios";
import reactQueryClient from "../libs/reactQuery";
import { QUERY_KEYS } from "../constants";
interface userData {
  profileImage?: string;
  coverImage?: string;
  bio: string;
  username: string;
  name: string;
}
const useUpdateProfile = (userId: string | undefined) => {
  const updateProfile = async (userData: userData) => {
    try {
      const url = `auth/update`;
      return await apiSecure.patch(url, userData);
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  };

  const mutation = useMutation({
    mutationFn: (userData: userData) => updateProfile(userData),
    onSuccess: () => {
      const mutationKey = `${QUERY_KEYS.user}/${userId}`;
      reactQueryClient.invalidateQueries({
        queryKey: [mutationKey],
      });
      toast.success("Profile updated Successfully");
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  return {
    updateProfile: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};
export default useUpdateProfile;
