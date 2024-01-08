// import fetcher from "@/libs/fetcher";
// import useSWR from "swr";

// const usePost = (postId: string) => {
//   const url = `/api/posts/${postId}`;
//   const { data, error, isLoading, mutate } = useSWR(url, fetcher);
//   return { data, error, isLoading, mutate };
// };
// export default usePost;

import { useQuery } from "react-query";
import apiSecure from "../libs/axios";

const usePosts = (userId?: string) => {
  const page = 1;
  const url = userId
    ? `/posts?userId=${userId}?page=${page}`
    : `/posts?page=${page}`;

  const fetchPost = async () => {
    const result = await apiSecure.get(url);
    return result.data;
  };
  const { data, error, isLoading } = useQuery("postsData", fetchPost);
  const responseData = data.data;
  return { data: responseData, error, isLoading };
};
export default usePosts;
