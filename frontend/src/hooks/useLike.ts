import { useCallback } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import apiSecure from "../libs/axios";
import reactQueryClient from "../libs/reactQuery";
import { QUERY_KEYS } from "../constants";

const useLike = ({ postId }: { postId: string }) => {
  const toggleLike = useCallback(
    async (isAlreadyLiked: boolean) => {
      try {
        let request;
        if (isAlreadyLiked) {
          request = () => apiSecure.delete(`likes/${postId}`);
        } else {
          request = () => apiSecure.put(`likes/${postId}`);
        }
        const insertedLike = await request();

        return { isAlreadyLiked, insertedLike };
      } catch (error) {
        console.log(e);
        throw Error(e);
      }
    },
    [postId]
  );
  const mutation = useMutation({
    mutationFn: (isAlreadyLiked: boolean) => toggleLike(isAlreadyLiked),
    onSuccess: ({ isAlreadyLiked, insertedLike }) => {
      if (postId) {
        const mutationKey = `${QUERY_KEYS.post}/${postId}`;
        reactQueryClient.invalidateQueries({
          queryKey: [mutationKey],
        });
      } else {
        const mutationKey = QUERY_KEYS.posts;

        reactQueryClient.setQueryData([mutationKey], (data) => ({
          ...data,
          pages: data.pages.map((page) =>
            page.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    _count: {
                      likes: isAlreadyLiked
                        ? post._count.likes - 1 // Decrement like if already liked
                        : post._count.likes + 1,
                    },
                    likes: !isAlreadyLiked ? [insertedLike] : [],
                  }
                : post
            )
          ),
        }));
      }
    },
  });
  return {
    toggleLike: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};
export default useLike;
