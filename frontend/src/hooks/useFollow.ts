import { useCallback } from "react";
import toast from "react-hot-toast";

import apiSecure from "../libs/axios";
import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import reactQueryClient from "../libs/reactQuery";
import { FetchedUser } from "../types/user";

interface FetchedUserResponse {
  data: FetchedUser;
}

const useFollow = (userId: string) => {
  const toggleFollow = useCallback(
    async (isFollowing: boolean) => {
      try {
        const requestURL = `/users/follows/${userId}`;
        let request;
        if (isFollowing) {
          request = () => apiSecure.delete(requestURL);
        } else {
          request = () => apiSecure.put(requestURL);
        }
        await request();

        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [userId]
  );
  const mutation = useMutation({
    mutationFn: (isFollowing: boolean) => toggleFollow(isFollowing),
    onSuccess: () => {
      // post listing
      const mutationKey = `${QUERY_KEYS.user}/${userId}`;

      reactQueryClient.setQueryData(
        [mutationKey],
        (response: FetchedUserResponse) => {
          response.data.isFollowing = !response.data.isFollowing;
          if (response.data.isFollowing) {
            response.data.followersCount = response.data.followersCount + 1;
          } else {
            response.data.followersCount = response.data.followersCount - 1;
          }
          return response;
        }
      );
    },
  });

  return {
    toggleFollow: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};
export default useFollow;
