import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const usePost = (postId: string) => {
  const url = `/api/posts/${postId}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return { data, error, isLoading, mutate };
};
export default usePost;
