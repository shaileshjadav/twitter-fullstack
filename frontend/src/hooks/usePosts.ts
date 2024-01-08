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

  return { data, error, isLoading };
};
export default usePosts;
