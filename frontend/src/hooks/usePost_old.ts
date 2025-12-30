import { useQuery } from "@tanstack/react-query";
import apiSecure from "../libs/axios";

const usePost = (postId: string) => {
  const url = `/posts/${postId}`;

  const fetchPost = async () => {
    const result = await apiSecure.get(url);
    return result.data;
  };
  const { data, error, isLoading } = useQuery("post", fetchPost);
  const responseData = data;
  return { data: responseData, error, isLoading };
};
export default usePost;

// const usePosts = (userId?: string) => {
//   const page = 1;
//   const url = userId
//     ? `/posts?userId=${userId}?page=${page}`
//     : `/posts?page=${page}`;

//   const fetchPost = async () => {
//     const result = await apiSecure.get(url);
//     return result.data;
//   };
//   const { data, error, isLoading } = useQuery("post", fetchPost);
//   const responseData = data.data;
//   return { data: responseData, error, isLoading };
// };
// export default usePosts;
