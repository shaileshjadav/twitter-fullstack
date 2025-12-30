import { useCallback } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import apiSecure from "../libs/axios";
import reactQueryClient from "../libs/reactQuery";
import { QUERY_KEYS } from "../constants";

interface Post {
  id: string;
  body: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
  hasLiked?: boolean;
  _count: {
    likes: number;
  };
}
interface allData {
  pages: Post[][];
}
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
        console.log(error);
        toast.error("something went wrong");
        // throw Error(e);
      }
    },
    [postId]
  );
  const updateData = (data: allData) => {
    return {
      ...data,
      pages: data.pages.map((page) =>
        page.map((post: Post) =>
          post.id === postId
            ? {
                ...post,
                _count: {
                  likes: post.hasLiked
                    ? post._count.likes - 1 // Decrement like if already liked
                    : post._count.likes + 1,
                },
                hasLiked: !post.hasLiked,
              }
            : post
        )
      ),
    };
  };
  const mutation = useMutation({
    mutationFn: (isAlreadyLiked: boolean) => toggleLike(isAlreadyLiked),
    onSuccess: () => {
      const singlePostMutationKey = `${QUERY_KEYS.post}/${postId}`;
      reactQueryClient.invalidateQueries({
        queryKey: [singlePostMutationKey],
      });
      // post listing
      const mutationKey = QUERY_KEYS.posts;

      reactQueryClient.setQueryData<allData | undefined>(
        [mutationKey],
        (data) => updateData(data as allData)
      );
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
