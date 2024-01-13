import { useMutation } from "@tanstack/react-query";
import apiSecure from "../libs/axios";
import reactQueryClient from "../libs/reactQuery";
import { QUERY_KEYS } from "../constants";
interface CreatePostData {
  body: string;
  isComment?: boolean;
}
const usePost = (postId: string) => {
  const addPost = async (postData: CreatePostData) => {
    const { isComment } = postData;
    if (isComment) {
      delete postData.isComment;
    }
    try {
      const url = isComment ? `/comments?postId=${postId}` : `/posts`;
      return await apiSecure.post(url, postData);
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  };

  const mutation = useMutation({
    mutationFn: (postData: CreatePostData) => addPost(postData),
    onSuccess: () => {
      const mutationKey = postId
        ? `${QUERY_KEYS.post}/${postId}`
        : QUERY_KEYS.posts;
      reactQueryClient.invalidateQueries({
        queryKey: [mutationKey],
      });
    },
  });

  return {
    submitPost: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };

  // const url = `/posts/${postId}`;

  // const fetchPost = async () => {
  //   const result = await apiSecure.get(url);
  //   return result.data;
  // };
  // const { data, error, isLoading } = useQuery("post", fetchPost);
  // const responseData = data;
  // return { data: responseData, error, isLoading };
};
export default usePost;
